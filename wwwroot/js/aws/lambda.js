var lamdda = (function () {
    var cursel = '';
    $('input[type=radio][name=lambda-role]').change(function () {
        if (this.value == 'create') {
            $("#aws-lamda-role").attr("placeholder", "Enter New Role Name");
            cursel = 'create';
        }
        else if (this.value == 'useexist') {
            $("#aws-lamda-role").attr("placeholder", "Enter Existing Role ARN (arn:aws:iam::<account>:role/<role name>)");
            cursel = 'useexist';
        }
    });

    $(document).ready(function () {
        $("#lamda-generate").on("click", function () {
            xhr.ajax({
                accessKey: "AA",
                secretKey: "RR",
                region: "GG",
                Lambda: {
                    NewRole: (cursel == 'create'),
                    Role: $("#aws-lamda-role").val(),
                    Handler: $("#aws-lamda-handler").val(),
                    Runtime: $("#aws-lambda-runtime").val(),
                    Filename: $("#aws-lamda-filename").val(),
                    Functionname: $("#aws-lamda-functionname").val()
                }
            });

            //popupOpenClose($(".popup"));
        });
    });

    function loadgraph(mem, exc) {

        d3.select("#budget-content svg").remove();

        var margin = { top: 20, right: 160, bottom: 35, left: 30 };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#budget-content")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var charges = {
            computepersecond: 0.00001667,
            requestpermillion: 0.20,
            freeComputeGBs: 400000,
            freeRequestCount: 1000000
        };

        var data = [
            //{ requestcount: "1000000", computecharges: "10", requestcharges: "15" },
            //{ requestcount: "2000000", computecharges: "10", requestcharges: "15" },
        ];

        //[1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000, 10000000, 50000000, 100000000, 200000000, 300000000].forEach(t => {
        [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000, 11000000, 12000000, 13000000].forEach(t => {
            var tcgbs = (t * exc) * (mem / 1024);
            var totcp = charges.freeComputeGBs >= tcgbs ? 0 : tcgbs - charges.freeComputeGBs;
            var reqcnt = charges.freeRequestCount >= t ? 0 : t - charges.freeRequestCount;
            data.push({
                requestcount: t,
                totalcomputeSeconds: (t * exc),
                totalcomputeGBs: tcgbs,
                freeComputeGBsPrice: charges.freeComputeGBs * charges.computepersecond,
                computePrice: totcp * charges.computepersecond,
                requestPrice: reqcnt * .2 / 1000000
            })
        });

        var dataset = d3.layout.stack()(["computePrice", "requestPrice" ].map(function (price) {
            return data.map(function (d) {
                return { x: d.requestcount, y: +d[price] };
            });
        }));

        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) { return d.x; }))
            .rangeRoundBands([10, width - 10], 0.02);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
            .range([height, 0]);

        //var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];
        var colors = ["#f2b447", "#d9d574"];


        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10)
            .tickSize(-width, 0, 0)
            .tickFormat(function (d) { return d });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
            //.tickFormat(d3.time.format("%Y"));

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        // Create groups for each series, rects for each segment 
        var groups = svg.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
            .data(function (d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) { return y(d.y0 + d.y); })
            .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
            .attr("width", x.rangeBand())
            .on("mouseover", function () { tooltip.style("display", null); })
            .on("mouseout", function () { tooltip.style("display", "none"); })
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y.toFixed(2));
            });


        // Draw legend
        var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d, i) {
                switch (i) {
                    case 0: return "Request Cost";
                    case 1: return "Compute Cost";
                    //case 2: return "McIntosh apples";
                    //case 3: return "Red Delicious apples";
                }
            });


        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(" + (30 / 2) + "," + (10 / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Price ($)");

        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(" + (width / 2) + "," + (height + 30) + ")")  // centre below axis
            .text("Request Count");

    }

    function range(start, end, step = 1) {
        const len = Math.floor((end - start) / step) + 1
        return Array(len).fill().map((_, idx) => start + (idx * step))
    }

    function loadbudget() {

        $("#budget-content").html("");

        //var memory = [128, 192, 256, 320, 384, 448, 512, 576];
        var memory = range(128, 3008, 64);
        var sel = $("<select style='margin-right: 30px;margin-left: 30px;'></select>");

        memory.forEach(t => {
            sel.append('<option value=' + t + '>' + t + 'MB</option>');
        });

        var d = $("<div style='margin-top:20px;padding-top:20px;'><span>Memory</sapn></div>");
        d.append(sel);
        d.append("<span>Execution Time (secs)</sapn>");
        var sec = $("<input type='number' style='width:55px;margin-right:30px;margin-left:30px;'  placeholder='1 sec' value='1' />");
        d.append(sec)
        $("#budget-content").append(d);

        sel.on("change", function () {
            loadgraph(sel.val(), sec.val());
        });
        sec.on("change", function () {
            loadgraph(sel.val(), sec.val());
        });

        loadgraph(128, 1);
    }

    return {
        loadbudget: loadbudget
    }
})();