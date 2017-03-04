import { element } from 'protractor';
import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.sass'],
  providers: [D3Service]
})
export class GraphCanvasComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement != null) {
      d3ParentElement = d3.select(this.parentNativeElement);

      // d3ParentElement.style('color', 'blue');

      var nodes = [
        { centerX: 10, centerY: 10, radiusX: 50, radiusY: 30 },
        { centerX: 200, centerY: 10, radiusX: 50, radiusY: 30 }];

      var presentableNodes = nodes.map(node => ({
        node: node,
        edgeRight: node.radiusX
      }));

      var svg = d3ParentElement
        .append('svg')
        .classed('graph-canvas-surface', true)
        .attr('viewBox', '0 0 600 400');

      var nodeElements = svg
        .selectAll('ellipse')
        .data(presentableNodes)
        .enter()
        .append('g')
        .attr('transform', data => `translate(${data.node.centerX},${data.node.centerY})`);

      console.log(nodeElements);

      let move = d3.drag()
        .container(<any>svg.node())
        .on('drag', function (data: any, index) {
          data.node.centerX += d3.event.dx;
          data.node.centerY += d3.event.dy;
          var nodeGroup = d3.select(<any>this.parentNode);
          nodeGroup.attr('transform', `translate(${data.node.centerX},${data.node.centerY})`);
        });

      let resize = d3.drag()
        .on('drag', function (data: any, index) {

          data.edgeRight += d3.event.dx;

          //Move resizer
          let resizer = d3.select(this);
          //resizer.attr('x', parseFloat(resizer.attr('x')) + d3.event.dx);
          resizer
            .attr('x1', data.edgeRight)
            .attr('y1', -data.node.radiusY)
            .attr('x2', data.edgeRight)
            .attr('y2', data.node.radiusY);

          var nodeGeometry = nodeElements.filter((nodeData, nodeIndex) => index == nodeIndex)
            .select('ellipse');

          nodeGeometry.attr('rx', parseFloat(nodeGeometry.attr('rx')) + d3.event.dx);
        });

      nodeElements.append('ellipse')
        .attr('rx', data => data.node.radiusX)
        .attr('ry', data => data.node.radiusY)
        .style('stroke', 'none')
        .style('fill', 'lightblue')
        .call(<any>move);

      // nodeElements.append('rect')
      //   .attr('x', data => data.edgeRight)
      //   .attr('y', data => -data.node.radiusY)
      //   .attr('width', 2)
      //   .attr('height', data => 2 * data.node.radiusY)
      //   .classed('resize-bar-vertical', true)
      //   // .attr('x', data => data.edgeRight)
      //   // .attr('y', 0)
      //   // .attr('width', 5)
      //   // .attr('height', 5)
      //   .call(<any>resize);

      // let rightLine = d3.line()
      // .
      // .x(data=>data.node)

      nodeElements.append('line')
        .attr('x1', data => data.edgeRight)
        .attr('y1', data => -data.node.radiusY)
        .attr('x2', data => data.edgeRight)
        .attr('y2', data => data.node.radiusY)
        .classed('resize-bar-vertical', true)
        .call(<any>resize)
        ;
      // nodeElements.append('path')
      //   .attr('d', data => d3.line()([
      //     [data.edgeRight, -data.node.radiusY],
      //     [data.edgeRight, data.node.radiusY]]
      //   ))
      //   .classed('resize-bar-vertical', true)
      //   .call(<any>resize);
    }
  }

  private dragHandler(d, i) {
    const d3 = this.d3;
  }

}
