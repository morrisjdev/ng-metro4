import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import 'linq4js';
import {Lists} from 'ng-metro4';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
  icons: any[];
  icon = 'home';

  color: string;

  constructor() {
    this.icons = Lists.icons().GroupBy(v => v.category).Select(g => {
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
