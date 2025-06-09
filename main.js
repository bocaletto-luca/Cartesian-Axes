 "use strict";
    // TAB NAVIGATION FUNCTION
    function openTab(evt, tabName) {
      const tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();
    
    /* ---------------- Set up the Cartesian plane ---------------- */
    const canvas = document.getElementById("cartCanvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const margin = 40;  // margin around canvas edges
    const scale = 20;   // 1 unit = 20 pixels
    
    function drawAxes() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      
      // Draw X-axis (horizontal)
      ctx.beginPath();
      ctx.moveTo(0, height/2);
      ctx.lineTo(width, height/2);
      ctx.stroke();
      
      // Draw Y-axis (vertical)
      ctx.beginPath();
      ctx.moveTo(width/2, 0);
      ctx.lineTo(width/2, height);
      ctx.stroke();
      
      // Draw tick marks on X-axis
      const tickLength = 10;
      // Starting at origin: compute how many ticks fit on each side.
      let numXTicks = Math.floor((width/2 - margin) / scale);
      for (let i = 1; i <= numXTicks; i++) {
        // Right side ticks
        let x = width / 2 + i * scale;
        ctx.beginPath();
        ctx.moveTo(x, height/2 - tickLength/2);
        ctx.lineTo(x, height/2 + tickLength/2);
        ctx.stroke();
        ctx.fillText(i, x - 3, height/2 + 20);
        // Left side ticks
        x = width / 2 - i * scale;
        ctx.beginPath();
        ctx.moveTo(x, height/2 - tickLength/2);
        ctx.lineTo(x, height/2 + tickLength/2);
        ctx.stroke();
        ctx.fillText(-i, x - 5, height/2 + 20);
      }
      
      // Draw tick marks on Y-axis
      let numYTicks = Math.floor((height/2 - margin) / scale);
      for (let i = 1; i <= numYTicks; i++) {
        // Top ticks
        let y = height/2 - i * scale;
        ctx.beginPath();
        ctx.moveTo(width/2 - tickLength/2, y);
        ctx.lineTo(width/2 + tickLength/2, y);
        ctx.stroke();
        ctx.fillText(i, width/2 + 8, y + 4);
        // Bottom ticks
        y = height/2 + i * scale;
        ctx.beginPath();
        ctx.moveTo(width/2 - tickLength/2, y);
        ctx.lineTo(width/2 + tickLength/2, y);
        ctx.stroke();
        ctx.fillText(-i, width/2 + 8, y + 4);
      }
    }
    
    // Draw the axes initially.
    drawAxes();
    
    /* ---------------- Plotting Points ---------------- */
    // We store points if needed, but for simplicity, plotting a point directly.
    function plotPoint() {
      const xVal = parseFloat(document.getElementById("coordX").value);
      const yVal = parseFloat(document.getElementById("coordY").value);
      const infoDiv = document.getElementById("canvasInfo");
      if (isNaN(xVal) || isNaN(yVal)) {
        infoDiv.innerHTML = "<p>Please enter valid coordinates.</p>";
        return;
      }
      // Transform point: center of canvas is (width/2, height/2)
      const xCanvas = width/2 + xVal * scale;
      const yCanvas = height/2 - yVal * scale; // invert y
      // Draw point
      ctx.fillStyle = "#FF5722";
      ctx.beginPath();
      ctx.arc(xCanvas, yCanvas, 5, 0, 2 * Math.PI);
      ctx.fill();
      infoDiv.innerHTML = `<p>Plotted point at ( ${xVal}, ${yVal} )</p>`;
    }
    
    function resetCanvas() {
      drawAxes();
      document.getElementById("canvasInfo").innerHTML = "";
    }
