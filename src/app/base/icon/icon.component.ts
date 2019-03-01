import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Lists} from 'ng-metro4';
import 'linq4js';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
  colorArrForSelect: any[];
  icons: any[];
  icon = 'home';

  color: string;

  constructor() {
    this.colorArrForSelect = Lists.getColors().map(c => {
      return {
        title: c,
        value: c
      };
    });

    this.icons = Lists.getIcons().GroupBy(i => i.category).Select(g => {
      return {
        groupName: g[0].category,
        options: g.Select(i => {
          return {
            title: i.name,
            value: i.name,
            dataTemplate: `<span class='mif-${i.name} icon'></span> ${i.name}`
          };
        })
      };
    });
  }

  ngOnInit() {
  }

}
