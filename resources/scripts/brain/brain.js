define(["jquery", "d3", "delaunay"], function($, d3, Delaunay){
    'use strict';

    class Brain{
        constructor(options){
            this.mainBackground = options.mainBackground;
            this.height = options.height || 500;
            this.width = options.width || 500;
            this.responsive = options.responsive || false;
            this.pointSize = options.pointSize || 5;
            this.strokeWidth = options.strokeWidth || 3;
            this.scaleX = options.width/500;
            this.scaleY = options.height/500;
            this.canvas = null;
            this.svg = null;
            this.colorCycle = 0;


            this.rainbowColors = [
                "#ff6666", "#ff9864", "#ffcb64", "#fffe64",
                "#ccfe64", "#7ffe64", "#66fe7e", "#66feb1",
                "#66fee3", "#66e4fd", "#66cbfd", "#6698fd",
                "#6665fd", "#9965fd", "#cc65fd", "#ff65fd",
                "#ff65ca", "#ff6597", "#ff657d"
            ];

            this.circles = {};
            this.triangles = [];
            this.transitionResetTimeout;
        }

    resetCanvas(canvas){
        //The actual canvas where we'll draw our stuff
        this.canvas = d3.select(canvas);
            this.canvas.html("");
            let canvasWidth = this.width;
            let canvasHeight = this.height;
            this.svg = this.canvas.append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .append("g")
    }

    drawCircle(container, node, radius, fill){
        return container.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", radius)
                .style("stroke", "transparent")
                .style("fill", fill);
    }

    drawTriangle(container, node1, node2, node3, strokeWidth, onmouseover, onmouseout){
            let points = `${node1[0].x},${node1[0].y},${node1[1].x},${node1[1].y},`
                + `${node2[0].x},${node2[0].y},${node2[1].x},${node2[1].y},`
                + `${node3[0].x},${node3[0].y},${node3[1].x},${node3[1].y}`;

            let textPoints = [
                `${node1[0].x}:${node1[0].y}`,
                `${node1[1].x}:${node1[1].y}`,
                `${node2[0].x}:${node2[0].y}`,
                `${node2[1].x},${node2[1].y}`,
                `${node3[0].x},${node3[0].y}`,
                `${node3[1].x}:${node3[1].y}`
            ];

            return container.append("polyline")
                .style("stroke", "#fff")
                .style("stroke-width", strokeWidth)
                .style("fill", "transparent")
                .attr("points", points)
                .attr("data-points", JSON.stringify(textPoints))
                .on("mouseover", onmouseover)
                .on("mouseout", onmouseout);
        }

    alphaShape(pts, alpha, onlyOuter){
            if(onlyOuter === null){
                onlyOuter = true;
            }

        if(pts.length <= 3){
            /* Need at least four points */
            return null;
        }

        let delaunay = new Delaunay(pts);
        let triangles = delaunay.triangulate();

        let edges = [];
        for(let i=0; i<triangles.length; i+=3){
            let pa = triangles[i];
            let pb = triangles[i+1];
            let pc = triangles[i+2];

            let a = Math.sqrt((pa.x - pb.x) ** 2 + (pa.y - pb.y) ** 2);
            let b = Math.sqrt((pb.x - pc.x) ** 2 + (pb.y - pc.y) ** 2);
            let c = Math.sqrt((pc.x - pa.x) ** 2 + (pc.y - pa.y) ** 2);
            let s = (a + b + c) / 2.0;
            let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            let circum_r = a * b * c / (4.0 * area);
            if(circum_r < alpha){
                this.addEdge(edges, pa, pb, onlyOuter);
                this.addEdge(edges, pb, pc, onlyOuter);
                this.addEdge(edges, pc, pa, onlyOuter);
            }
        }
        return edges;
        }

        addEdge(edges, i, j, onlyOuter){
                /* Add a line between the i-th and j-th points,
                if not in the list already */
            if(edges.indexOf([i, j]) >= 0 || edges.indexOf([j, i]) >= 0){
                //already added
            }else{
                if(onlyOuter){
                    let index = edges.indexOf([j, i]);
                    if(index >= 0){
                        edges.splice(index, 1);
                    }
                    return;
                }
                edges.push([i, j]);
            }
        }

        resetTransition(){
            for(let t of this.triangles){
                t.transition()
                    .duration(3000)
                    .style("fill", "transparent")
                    .style("stroke", "#fff");
            }
            for(let c in this.circles){
                if(this.circles.hasOwnProperty(c)){
                    this.circles[c]
                        .transition()
                        .duration(3000)
                        .style("fill", "#fff");
                }
            }
        }

        scale(tPoint){
            return [{x: tPoint[0].x * this.scaleX, y: tPoint[0].y * this.scaleY},
                {x: tPoint[1].x * this.scaleX, y: tPoint[1].y * this.scaleY}];
        }

        draw(pts){
            const onmouseover = function(){
                let brain = this;
                return function(){
                    if(brain.transitionResetTimeout){
                        clearTimeout(brain.transitionResetTimeout);
                    }

                    let el = d3.select(this);
                    let cInd = brain.colorCycle++ % brain.rainbowColors.length;
                    let color = brain.rainbowColors[cInd];

                    let circles = [];
                    for(let textPoint of JSON.parse(el.attr("data-points"))){
                        if(brain.circles[textPoint]){
                            circles.push(brain.circles[textPoint]);
                        }
                    }

                    for(let c of circles){
                        c.transition()
                            .duration(200)
                            .style("fill", color);
                    }
                    el.transition()
                        .duration(200)
                        .style("stroke", color);

                    brain.transitionResetTimeout = setTimeout(function(){this.resetTransition();}.bind(brain), 2000);
                };
            }.bind(this)();
            const noop = function(){

            }

            let container = this.svg.append("svg:g").attr("class", "brain-diagram");
            this.drawCircle(container, {x: this.width / 2, y: this.height / 2}, this.width / 2,
                this.mainBackground, noop, noop);

            container = container.append("svg:g").attr("class", "brian-points");
            let triangles = this.alphaShape(pts, 50, false);

            let processedPoints = [];
            for(let p of pts){
                processedPoints.push({x: p.x * this.scaleX, y: p.y * this.scaleY});
            }

            for(let i = 0; i < triangles.length; i += 3){
                let A = this.scale(triangles[i]);
                let B = this.scale(triangles[i+1]);
                let C = this.scale(triangles[i+2]);
                let action = noop;
                if(this.responsive){
                    action = onmouseover;
                }
                this.triangles.push(this.drawTriangle(container, A, B, C, this.strokeWidth * this.scaleX, action, noop));
            }

            for(let n of processedPoints){
                this.circles[`${n.x}:${n.y}`] = this.drawCircle(container, n, this.pointSize * this.scaleX, "#fff");
            }
        }

        write(target){
            this.resetCanvas(target);
            this.draw(this.dataProvider);
        }
    };

    return function(jsonData, target, options){
        const brain = new Brain(options);
        brain.dataProvider = jsonData;
        brain.write(target);
    };
});
