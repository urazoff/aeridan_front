import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef,
  AfterContentInit, AfterViewInit
} from '@angular/core';
import {IArticle} from '../interfaces/IArticle';
import {HeaderComponent} from './header/header.component';
import {ImageComponent} from './image/image.component';
import {ListComponent} from './list/list.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {QuoteComponent} from './quote/quote.component';
import {TableComponent} from './table/table.component';
import {LinkComponent} from './link/link.component';
import {EmbedComponent} from './embed/embed.component';

@Component({
  selector: 'app-article-renderer',
  templateUrl: './article-renderer.component.html',
  styleUrls: ['./article-renderer.component.less']
})
export class ArticleRendererComponent implements OnInit, AfterViewInit {

  @Input() article: IArticle;
  @ViewChild('articleContent', {static: false}) articleContent;
  componentToTypeDict: object = {
    heading: HeaderComponent,
    image: ImageComponent,
    list: ListComponent,
    paragraph: ParagraphComponent,
    quote: QuoteComponent,
    table: TableComponent,
    link: LinkComponent,
    embed: EmbedComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    if (this.article === undefined) {
      this.article = {
        createdAt: 1570229551078,
        updatedAt: 1570229551078,
        id: 46,
        layout: {
          title: 'Article title',
          time: 1570229550816,
          blocks: [{
            type: 'paragraph',
            data: {text: '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel \nlacus eros. Aliquam et sodales leo. Sed sapien nisi, dapibus vitae \nmalesuada vel, rutrum eget dui. Quisque nec molestie orci, eu vulputate \norci. Praesent viverra tortor sed risus elementum, vel fermentum risus \naccumsan. In in hendrerit ex, eget viverra nisi. Donec sed erat lorem. \nMorbi mollis pulvinar pharetra. Integer egestas diam ac tellus porta \ncondimentum. Duis non auctor magna.\n'}
          }, {type: 'heading', data: {text: 'First header', level: 2}}, {
            type: 'paragraph',
            data: {text: 'Morbi tristique augue tortor, eget porttitor ante suscipit sit amet. Cras in purus id massa euismod scelerisque. Nam malesuada tellus non turpis pharetra porta. Phasellus in nunc at magna dapibus dictum sit amet et nunc. Sed metus urna, bibendum id eleifend at, suscipit nec nunc. Nunc quis interdum neque. Duis et venenatis elit. In tempus, justo ut pretium scelerisque, orci nulla iaculis arcu, eget venenatis nibh arcu at mauris. Nam eu dui tortor. Morbi laoreet ornare viverra. '}
          }, {
            type: 'paragraph',
            data: {text: '\nFusce euismod ligula eu arcu rhoncus, nec commodo velit mollis. Cras \nvitae eros in mauris euismod tempor in ac mi. Pellentesque habitant \nmorbi tristique senectus et netus et malesuada fames ac turpis egestas. \nNullam porttitor magna ut urna rutrum, ac molestie dui pharetra. Morbi \nvitae efficitur odio, a sodales neque. Fusce quis justo id risus mattis \nelementum eu vitae justo. Nunc fermentum auctor erat, sed eleifend ante \nrhoncus sit amet. Duis a diam nec nisl sodales rutrum. Curabitur at \npulvinar mauris. Mauris neque metus, cursus vel efficitur in, \npellentesque vitae nunc. Duis porta iaculis ante, elementum eleifend \norci scelerisque nec.\n'}
          }, {
            type: 'list',
            data: {
              style: 'ordered',
              items: ['Ligula eu arcu rhoncus', 'Nullam porttitor magna ut urna rutrum', 'Curabitur at pulvinar mauris']
            }
          }, {type: 'heading', data: {text: 'Second header', level: 2}}, {
            type: 'paragraph',
            data: {text: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam aliquam a nulla eget commodo. Maecenas porttitor enim a ultrices rhoncus. Proin eu nulla sed mauris venenatis egestas sit amet et odio. Duis egestas nunc in luctus eleifend. In quis turpis at justo rhoncus mattis. Phasellus velit est, consectetur eget nunc et, mollis euismod justo. '}
          }, {
            type: 'quote',
            data: {
              text: ' Quisque imperdiet accumsan erat rhoncus dictum. Cras tortor sem, rhoncus eget egestas et, ullamcorper et diam. Etiam sed ultricies justo.',
              caption: 'Etiam J. J.<br>',
              alignment: 'left'
            }
          }, {type: 'paragraph', data: {text: 'Maecenas porttitor enim a ultrices rhoncus.'}}, {
            type: 'embed',
            data: {
              service: 'youtube',
              source: 'https://www.youtube.com/watch?v=iHibTVBB8S4',
              embed: 'https://www.youtube.com/embed/iHibTVBB8S4',
              width: 580,
              height: 320,
              caption: 'Maecenas porttitor enim a ultrices rhoncus'
            }
          }],
          version: '2.15.1'
        },
        owner: {
          createdAt: 1569682543196,
          updatedAt: 1569682543196,
          id: 1,
          emailAddress: 'admin@example.com',
          emailStatus: 'confirmed',
          emailChangeCandidate: '',
          password: '$2a$10$gZ3/uybZadqTLXFaiE2gtu4/VKzYditpWEcg.XqpiP3PMUlOGtnw6',
          fullName: 'Ryan Dahl',
          isSuperAdmin: true,
          passwordResetToken: '',
          passwordResetTokenExpiresAt: 0,
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          stripeCustomerId: '',
          hasBillingCard: false,
          billingCardBrand: '',
          billingCardLast4: '',
          billingCardExpMonth: '',
          billingCardExpYear: '',
          tosAcceptedByIp: '',
          lastSeenAt: 0
        }
      };
    }
  }

  ngAfterViewInit() {
    if (this.article !== undefined) {
      for (const block of this.article.layout.blocks) {
        this.findAndCreateComponent(block.type, block.data);
      }
    }
  }

  findAndCreateComponent(type: string, data: any) {
    if (this.componentToTypeDict[type]) {
      const articleComponent = this.componentFactoryResolver.resolveComponentFactory(this.componentToTypeDict[type]);
      const articleComponentRef = this.articleContent.viewContainerRef.createComponent(articleComponent);

      (articleComponentRef.instance).data = data;
    }
  }


}
