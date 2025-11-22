// Dashboard - Analytics and Charts
class Dashboard {
    constructor() {
        this.focusChart = null;
        this.chartData = [];
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        // Initialize when dashboard becomes visible
        this.setupChartData();
        this.createFocusChart();
        this.isInitialized = true;
    }

    setupChartData() {
        // Load focus sessions from localStorage
        const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');
        
        // Prepare data for chart
        this.chartData = this.prepareFocusChartData(sessions);
    }

    prepareFocusChartData(sessions) {
        const last7Days = this.getLast7Days();
        const dayData = {};
        
        // Initialize with zeros
        last7Days.forEach(day => {
            dayData[day] = {
                totalFocus: 0,
                sessionCount: 0,
                averageFocus: 0
            };
        });
        
        // Aggregate session data by day
        sessions.forEach(session => {
            const sessionDate = new Date(session.startTime).toDateString();
            if (dayData[sessionDate]) {
                dayData[sessionDate].totalFocus += session.averageFocus;
                dayData[sessionDate].sessionCount += 1;
            }
        });
        
        // Calculate averages
        Object.keys(dayData).forEach(day => {
            const data = dayData[day];
            if (data.sessionCount > 0) {
                data.averageFocus = Math.round(data.totalFocus / data.sessionCount);
            }
        });
        
        return last7Days.map(day => ({
            date: day,
            focus: dayData[day].averageFocus
        }));
    }

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toDateString());
        }
        return days;
    }

    createFocusChart() {
        const canvas = document.getElementById('focus-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.focusChart) {
            this.focusChart.destroy();
        }

        const labels = this.chartData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });

        const data = this.chartData.map(item => item.focus);

        this.focusChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Focus Level (%)',
                    data: data,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgb(99, 102, 241)',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `Focus Level: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        }
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: 'rgb(99, 102, 241)',
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Make canvas responsive
        canvas.style.height = '300px';
    }

    updateChart() {
        if (!this.isInitialized) return;
        
        this.setupChartData();
        
        if (this.focusChart) {
            const labels = this.chartData.map(item => {
                const date = new Date(item.date);
                return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            });
            
            const data = this.chartData.map(item => item.focus);
            
            this.focusChart.data.labels = labels;
            this.focusChart.data.datasets[0].data = data;
            this.focusChart.update();
        }
    }

    calculateWeeklyStats() {
        const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');
        const now = Date.now();
        const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        const weekSessions = sessions.filter(session => session.startTime >= weekAgo);
        
        if (weekSessions.length === 0) {
            return {
                totalTime: 0,
                averageFocus: 0,
                sessionsCount: 0,
                bestDay: 'N/A',
                improvement: 0
            };
        }
        
        const totalTime = weekSessions.reduce((sum, session) => sum + session.duration, 0);
        const totalFocus = weekSessions.reduce((sum, session) => sum + session.averageFocus, 0);
        const averageFocus = Math.round(totalFocus / weekSessions.length);
        
        // Find best performing day
        const dayStats = {};
        weekSessions.forEach(session => {
            const day = new Date(session.startTime).toLocaleDateString('en-US', { weekday: 'long' });
            if (!dayStats[day]) {
                dayStats[day] = { focus: 0, count: 0 };
            }
            dayStats[day].focus += session.averageFocus;
            dayStats[day].count += 1;
        });
        
        let bestDay = 'N/A';
        let bestFocus = 0;
        Object.keys(dayStats).forEach(day => {
            const avgFocus = dayStats[day].focus / dayStats[day].count;
            if (avgFocus > bestFocus) {
                bestFocus = avgFocus;
                bestDay = day;
            }
        });
        
        // Calculate improvement (compare first half to second half of week)
        const midWeek = weekAgo + (3.5 * 24 * 60 * 60 * 1000);
        const firstHalf = weekSessions.filter(s => s.startTime < midWeek);
        const secondHalf = weekSessions.filter(s => s.startTime >= midWeek);
        
        let improvement = 0;
        if (firstHalf.length > 0 && secondHalf.length > 0) {
            const firstAvg = firstHalf.reduce((sum, s) => sum + s.averageFocus, 0) / firstHalf.length;
            const secondAvg = secondHalf.reduce((sum, s) => sum + s.averageFocus, 0) / secondHalf.length;
            improvement = Math.round(secondAvg - firstAvg);
        }
        
        return {
            totalTime: Math.round(totalTime / 60000), // Convert to minutes
            averageFocus,
            sessionsCount: weekSessions.length,
            bestDay,
            improvement
        };
    }

    generateInsights() {
        const stats = this.calculateWeeklyStats();
        const insights = [];
        
        if (stats.sessionsCount === 0) {
            insights.push({
                type: 'info',
                title: 'Get Started',
                message: 'Start your first focus tracking session to see personalized insights here.'
            });
            return insights;
        }
        
        // Focus level insights
        if (stats.averageFocus >= 80) {
            insights.push({
                type: 'success',
                title: 'Excellent Focus!',
                message: `Your average focus this week is ${stats.averageFocus}%. Keep up the great work!`
            });
        } else if (stats.averageFocus >= 60) {
            insights.push({
                type: 'info',
                title: 'Good Progress',
                message: `Your focus level is ${stats.averageFocus}%. Try minimizing distractions to improve further.`
            });
        } else {
            insights.push({
                type: 'warning',
                title: 'Room for Improvement',
                message: `Your focus level is ${stats.averageFocus}%. Consider using the Pomodoro technique for better concentration.`
            });
        }
        
        // Study time insights
        if (stats.totalTime >= 300) { // 5 hours
            insights.push({
                type: 'success',
                title: 'Dedicated Learner',
                message: `You've studied for ${Math.round(stats.totalTime / 60)} hours this week. Excellent dedication!`
            });
        } else if (stats.totalTime >= 120) { // 2 hours
            insights.push({
                type: 'info',
                title: 'Steady Progress',
                message: `You've studied for ${Math.round(stats.totalTime / 60)} hours this week. Try to increase gradually.`
            });
        }
        
        // Best day insight
        if (stats.bestDay !== 'N/A') {
            insights.push({
                type: 'info',
                title: 'Peak Performance',
                message: `${stats.bestDay} was your most focused day. What made it special?`
            });
        }
        
        // Improvement insight
        if (stats.improvement > 10) {
            insights.push({
                type: 'success',
                title: 'Improving Trend',
                message: `Your focus improved by ${stats.improvement}% this week. Great progress!`
            });
        } else if (stats.improvement < -10) {
            insights.push({
                type: 'warning',
                title: 'Focus Declining',
                message: `Your focus decreased by ${Math.abs(stats.improvement)}% this week. Take breaks and stay motivated.`
            });
        }
        
        return insights;
    }

    displayInsights() {
        const insights = this.generateInsights();
        const container = document.querySelector('#insights-container');
        
        if (!container) return;
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-card insight-${insight.type}">
                <div class="insight-icon">
                    ${this.getInsightIcon(insight.type)}
                </div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.message}</p>
                </div>
            </div>
        `).join('');
    }

    getInsightIcon(type) {
        const icons = {
            success: '<i class="fas fa-trophy"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-lightbulb"></i>',
            error: '<i class="fas fa-times-circle"></i>'
        };
        return icons[type] || icons.info;
    }

    exportData() {
        const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]');
        const userData = JSON.parse(localStorage.getItem('eduFocusUserData') || '{}');
        
        const exportData = {
            exportDate: new Date().toISOString(),
            sessions: sessions,
            userData: userData,
            summary: this.calculateWeeklyStats()
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `edufocus-data-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    // Public methods
    refresh() {
        this.updateChart();
        this.displayInsights();
        
        // Update other dashboard elements if app is available
        if (window.app) {
            window.app.updateDashboard();
        }
    }

    getChartInstance() {
        return this.focusChart;
    }

    destroy() {
        if (this.focusChart) {
            this.focusChart.destroy();
            this.focusChart = null;
        }
    }
}

// Add insight styles
const insightStyles = `
#insights-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}

.insight-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: var(--transition);
    border-left: 4px solid var(--gray-300);
}

.insight-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.insight-card.insight-success {
    border-left-color: var(--success-color);
}

.insight-card.insight-warning {
    border-left-color: var(--warning-color);
}

.insight-card.insight-info {
    border-left-color: var(--primary-color);
}

.insight-card.insight-error {
    border-left-color: var(--danger-color);
}

.insight-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.insight-success .insight-icon {
    background: var(--success-color);
    color: white;
}

.insight-warning .insight-icon {
    background: var(--warning-color);
    color: white;
}

.insight-info .insight-icon {
    background: var(--primary-color);
    color: white;
}

.insight-error .insight-icon {
    background: var(--danger-color);
    color: white;
}

.insight-content h4 {
    margin: 0 0 0.5rem 0;
    color: var(--dark-color);
    font-size: 1.1rem;
}

.insight-content p {
    margin: 0;
    color: var(--gray-600);
    line-height: 1.5;
    font-size: 0.95rem;
}

.chart-container {
    position: relative;
    height: 350px;
}

.dashboard-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.export-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
    transition: var(--transition);
}

.export-btn:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    #insights-container {
        grid-template-columns: 1fr;
    }
    
    .dashboard-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .chart-container {
        height: 250px;
    }
}
`;

// Inject insight styles
const insightStyleSheet = document.createElement('style');
insightStyleSheet.textContent = insightStyles;
document.head.appendChild(insightStyleSheet);

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
    
    // Add insights container to dashboard section if it doesn't exist
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection && !document.getElementById('insights-container')) {
        const insightsContainer = document.createElement('div');
        insightsContainer.id = 'insights-container';
        
        const insightsTitle = document.createElement('h3');
        insightsTitle.textContent = 'Insights & Recommendations';
        insightsTitle.style.marginBottom = '1rem';
        insightsTitle.style.color = 'var(--dark-color)';
        
        dashboardSection.appendChild(insightsTitle);
        dashboardSection.appendChild(insightsContainer);
        
        // Add export button
        const exportBtn = document.createElement('button');
        exportBtn.className = 'export-btn';
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
        exportBtn.onclick = () => window.dashboard.exportData();
        
        const chartContainer = dashboardSection.querySelector('.chart-container');
        if (chartContainer) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'dashboard-actions';
            actionsDiv.innerHTML = '<div></div>'; // Empty div for spacing
            actionsDiv.appendChild(exportBtn);
            
            chartContainer.parentNode.insertBefore(actionsDiv, chartContainer);
        }
    }
});