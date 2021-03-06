import { Color, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { TrackerService } from './services/tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public world: any = {};
  public brasil: any = {};
  public isLoading: boolean = true;

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Confirmados' },
    { data: [0], label: 'Mortes' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: { unit: 'day' }
      }],
      yAxes: [{}],
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          console.log(tooltipItem, data);
          return new Date(tooltipItem[0].label).toLocaleString().split(' ', 1)[0];
        }
      }
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(52, 152, 219,0)',
      borderColor: 'rgba(52, 152, 219,1.0)',
      pointBackgroundColor: 'rgba(52, 152, 219,1.0)',
      pointHoverBorderColor: 'rgba(52, 152, 219,1.0)'
    },
    {
      backgroundColor: 'rgba(231, 76, 60,0)',
      borderColor: 'rgba(231, 76, 60,1.0)',
      pointBackgroundColor: 'rgba(231, 76, 60,1.0)',
      pointHoverBorderColor: 'rgba(231, 76, 60,1.0)'
    }
  ];

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.trackerService.getLatest()
      .subscribe((world: any) => {
        this.world = world;

        this.trackerService.getBrasil()
        .subscribe((brasil: any) => {
          this.brasil = brasil;

          for (const date in this.brasil.locations[0].timelines.confirmed.timeline) {
            if (this.brasil.locations[0].timelines.confirmed.timeline.hasOwnProperty(date)) {
              this.lineChartData[0].data.push(this.brasil.locations[0].timelines.confirmed.timeline[date]);

              this.lineChartLabels.push(date);
            }
          }

          for (const date in this.brasil.locations[0].timelines.deaths.timeline) {
            if (this.brasil.locations[0].timelines.deaths.timeline.hasOwnProperty(date)) {
              this.lineChartData[1].data.push(this.brasil.locations[0].timelines.deaths.timeline[date]);
            }
          }

          this.isLoading = false;
        });
      });
  }

  public getPercent(total: number, value: number): number {
    return (value / total) * 100;
  }
}
