    //Variables:
    const menuListEl = document.getElementById('menuList');
    const menuListItemsEl = document.querySelectorAll('.menu-list-item');
    const reportsEl = document.getElementById('dashboardReports');
    
    //Function: Get Data
    async function getData() {
        const response = await fetch('data.json');
        const responseData = await response.json();

        return responseData;
    }

    //Function: Select Time Period
    async function selectTimePeriod(period) {
        if (period.classList.contains('menu-list-item')) {
            //add-remove active class
            menuListItemsEl.forEach(item => item.classList.remove('active'));
            period.classList.add('active');
            //select certain elements from array
            const currentPeriod = period.textContent.toLowerCase();
            const data = await getData();
            //empty reports el content
            reportsEl.innerHTML = '';
            data.forEach(item => {
                const timeFrames = item.timeframes;
                if (currentPeriod === 'daily') {
                    initReport(item.title, timeFrames.daily, 'day');
                } else if (currentPeriod === 'weekly') {
                    initReport(item.title, timeFrames.weekly, 'week');
                } else if (currentPeriod === 'monthly') {
                    initReport(item.title, timeFrames.monthly, 'month');
                }
            });
        }
    }

    //Function: Init Period
    function initReport(title, timePeriod, periodName) {
        const report = document.createElement('div');
        const titleLower = (title === 'Self Care') ? 'self-care' : title.toLowerCase();
        report.classList.add('report', `report-${ titleLower }`, 'fade-in');
        report.innerHTML = `<div class="report-icon">
            <img src="images/icon-${ titleLower }.svg" alt="${ titleLower }-icon">
        </div>
        <div class="report-content">
            <div class="field">
                <h5>${ title }</h5>
                <img src="images/icon-ellipsis.svg" alt="ellipsis-icon">
            </div>
            <div class="time">
                <div class="total-time">${ timePeriod.current }hrs</div>
                <span class="last-time">Last ${ periodName } - ${ timePeriod.previous }hrs</span>
            </div>
        </div>`;
        reportsEl.appendChild(report);
    }



    //Event: DOM Content Loaded
    document.addEventListener('DOMContentLoaded', async () => {
        //init start report
        const data = await getData();
        console.log(data);
        data.forEach(item => {
           initReport(item.title, item.timeframes.weekly, 'week'); 
        });

        //Event: Select Time Period
        menuListEl.addEventListener('click', e => {
            selectTimePeriod(e.target);
        });
    });