import { Component, Input} from '@angular/core';

const statsNames = [
  {name: 'hp', abbrev: 'HP'},
  {name: 'attack', abbrev: 'ATK'},
  {name: 'defense', abbrev: 'DEF'},
  {name: 'special-attack', abbrev: 'S-ATK'},
  {name: 'special-defense', abbrev: 'S-DEF'},
  {name: 'speed', abbrev: 'SPD'},
];

const chartRadius = 120;

function coordsFromAngleRadius(i: number, radius: number) {
  const angle = Math.PI * 2 / statsNames.length * i;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

function pointFromAngleRadius(i: number, radius: number) {
  return coordsFromAngleRadius(i, radius).join(',');
}

@Component({
  moduleId: module.id,
  selector: 'my-stats-chart',
  templateUrl: './stats-chart.component.html'
})
export class StatsChartComponent {
  @Input() pokemonStats: {[key: string]: number};
  @Input() averageStats: {[key: string]: number} = null;

  points(stats: {[key: string]: number}): string {
    return statsNames
      .map((name, i) => {
        const radius = chartRadius * stats[name.name] / 255;
        return pointFromAngleRadius(i, radius);
      }).join(' ');
  }

  polygonBorder(scale: number) {
    return statsNames.map((name, i) =>
      pointFromAngleRadius(i, chartRadius * scale)
    ).join(' ');
  }

  allStats() {
    return statsNames
      .map((name, i) => {
        const [x, y] = coordsFromAngleRadius(i, chartRadius);
        return {
          name: name.abbrev,
          x,
          y,
          transform: `translate(${pointFromAngleRadius(i, chartRadius + 30)})`,
        }
      });
  }
}
