import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { GraphCanvasComponent } from './graph-canvas/graph-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    GraphCanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
