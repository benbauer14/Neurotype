import React from 'react';
import LineElement from 'chart.js/auto';

const LineChart = () => {

    const labels;
    const data = {
        lables: labels,
        datasets: [{
            label: 'Brain Activity',
            data: [],
            fill: false,
            borderColor: 'red',
            tension: 0.1
        }]
    }

    const config = {
        type: 'line',
        data: data
    }


    return(
        <>

        </>
    )
}


export default LineChart;
