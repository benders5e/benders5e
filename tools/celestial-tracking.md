---
layout: page
title: Celestial Tracker 
permalink: /tools/celestial-tracking/
parent: Tools
---

<style>
    .button {
        background-color: #ccc;
        border: none;
        color: white;
        padding: 2px 2%;
        text-decoration: none!important;
        display: block;
        border-radius: .5em;
    } .button:hover, a:visited {
        color: white;
    }
    #minus {
        float: left;
    }
    #plus {
        float: right;
    }
    #monthText {
        font-weight: bold;
        text-align: center;
        margin-bottom: 1em;
    }
    th {
        text-align: center;
    }
    #dayCell {
        background-color: #ffdb99;
    }
    #nightCell {
        background-color: black;
        color: white;
    }
    #dayDiv, #nightDiv {
        height: 3em;
    }
</style>

<div id="monthText"></div>


<table>
<tr>
    <th>
        <a class="button" id="minus" href="#">< </a>
        <span id="dayText"></span>
        <a class="button" id="plus" href="#">></a>
    </th>
</tr>
<tr>
    <td id="dayCell"><div id="dayDiv">
        <span id="solarEclipse">Solar Eclipse <img style="height: 1em" src="../../assets/total-eclipse.svg"/><img style="height: 1em" src="../../assets/partial-eclipse.svg"/></span>
        <p id="winterSolstice">Winter Solstice</p>
        <p id="summerSolstice">Summer Solstice</p>
        <!-- potentially equinoxes -->
        <p id="harmonicConvergence">Harmonic Convergence</p>
    </div></td>
</tr>
<tr>
    <td id="nightCell"><div id="nightDiv">
        <span id="moonPhaseText"></span>
        <span id="lunarEclipse"><img style="height: 1em" src="../../assets/lunar-eclipse.svg"/></span>
        <span id="comet">Comet &#x2604;</span>
    </div></td>
</tr>
</table>

<script src="../celestial-tracking.js"></script>