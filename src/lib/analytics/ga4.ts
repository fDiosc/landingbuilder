import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA4_CLIENT_EMAIL,
        private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }
});

const propertyId = process.env.GA4_PROPERTY_ID;

export async function getLandingAnalytics(
    landingId: string,
    startDate: string = '7daysAgo',
    endDate: string = 'today'
) {
    if (!propertyId) throw new Error("GA4_PROPERTY_ID is not configured");

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [
                { name: 'date' },
                { name: 'deviceCategory' },
                { name: 'sessionSource' },
            ],
            metrics: [
                { name: 'activeUsers' },
                { name: 'screenPageViews' },
                { name: 'sessions' },
                { name: 'averageSessionDuration' },
                { name: 'bounceRate' },
            ],
            dimensionFilter: {
                filter: {
                    fieldName: 'customEvent:landing_id',
                    stringFilter: {
                        matchType: 'EXACT',
                        value: landingId,
                    },
                },
            },
        });

        const metrics = {
            totalViews: 0,
            uniqueVisitors: 0,
            sessions: 0,
            avgDuration: 0,
            bounceRate: 0,
            byDevice: {} as Record<string, number>,
            bySources: {} as Record<string, number>,
            dailyViews: [] as Array<{ date: string; views: number }>,
        };

        if (response.rows) {
            response.rows.forEach((row) => {
                const date = row.dimensionValues?.[0]?.value || '';
                const device = row.dimensionValues?.[1]?.value || 'unknown';
                const source = row.dimensionValues?.[2]?.value || 'direct';

                const visitors = parseInt(row.metricValues?.[0]?.value || '0');
                const views = parseInt(row.metricValues?.[1]?.value || '0');
                const sessionsRes = parseInt(row.metricValues?.[2]?.value || '0');
                const duration = parseFloat(row.metricValues?.[3]?.value || '0');
                const bounce = parseFloat(row.metricValues?.[4]?.value || '0');

                metrics.totalViews += views;
                metrics.uniqueVisitors += visitors;
                metrics.sessions += sessionsRes;
                metrics.avgDuration += duration;
                metrics.bounceRate += bounce;

                // Aggregate by device
                metrics.byDevice[device] = (metrics.byDevice[device] || 0) + views;

                // Aggregate by source
                metrics.bySources[source] = (metrics.bySources[source] || 0) + views;

                // Daily breakdown
                const existing = metrics.dailyViews.find(d => d.date === date);
                if (existing) {
                    existing.views += views;
                } else {
                    metrics.dailyViews.push({ date, views });
                }
            });

            // Average out bounce and duration if rows exist
            if (response.rows.length > 0) {
                metrics.avgDuration = metrics.avgDuration / response.rows.length;
                metrics.bounceRate = metrics.bounceRate / response.rows.length;
            }
        }

        // Sort daily views by date string
        metrics.dailyViews.sort((a, b) => a.date.localeCompare(b.date));

        return metrics;
    } catch (error) {
        console.error('GA4 API Error:', error);
        throw error;
    }
}

export async function getLandingEvents(
    landingId: string,
    eventName: string,
    startDate: string = '7daysAgo',
    endDate: string = 'today'
) {
    if (!propertyId) throw new Error("GA4_PROPERTY_ID is not configured");

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [
            { name: 'eventName' },
            { name: 'date' },
        ],
        metrics: [
            { name: 'eventCount' },
        ],
        dimensionFilter: {
            andGroup: {
                expressions: [
                    {
                        filter: {
                            fieldName: 'customEvent:landing_id',
                            stringFilter: { matchType: 'EXACT', value: landingId },
                        },
                    },
                    {
                        filter: {
                            fieldName: 'eventName',
                            stringFilter: { matchType: 'EXACT', value: eventName },
                        },
                    },
                ],
            },
        },
    });

    const events = response.rows?.map((row) => ({
        date: row.dimensionValues?.[1]?.value || '',
        count: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [];

    return {
        eventName,
        totalCount: events.reduce((sum, e) => sum + e.count, 0),
        daily: events,
    };
}
