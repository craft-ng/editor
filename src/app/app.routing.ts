import { GraphCanvasComponent } from './graphs/graph-canvas/graph-canvas.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: GraphCanvasComponent },
    // { path: '/canvas', component: GraphCanvasComponent }
];


export const navigatableComponents = [
    WorkspaceComponent
];