---
layout: default
title: Pro Bending Tracker
permalink: /tools/pro-bending/
parent: Tools
---

*Note: this widget is still in progress so it may have some bugs. Let us know if you find one through our <a target="_blank" href="https://forms.gle/H2VMopAN7gtaRrG5A">feedback form</a>!*

<table id="player-table">
    <tr>
        <th rowspan="2">Name</th>
        <th rowspan="2">AC</th>
        <th rowspan="2">HP</th>
        <th colspan="3">HP Checkpoints</th>
        <th colspan="2">Position</th>
    </tr>
    <tr style="text-align: center;" id="append-after">
        <td>Full</td>
        <td>2/3</td>
        <td>1/3</td>
        <td>Zone</td>
        <td>From back</td>
    </tr>
    <tr id="input-row">
        <td><input type="text" id="name-input"></td>
        <td><input type="number" id="AC-input"></td>
        <td><input type="number" id="HP-input"></td>
        <td colspan="5"><input type="submit" id="add" value="Add"></td>
        <!-- <td></td><td></td><td></td><td></td><td></td> -->
    </tr>
</table>

<p id="result" style="color: red;"></p>

Enter a character's name, AC, and max HP, then click "add". The widget will automatically calculate that character's HP checkpoints and set it at the starting position. Update a character's AC anytime by modifying the AC field. You can update its HP similarly (make sure you hit enter!). Additionally, the HP field can handle math: if your input starts with `+` or `-`, the widget will add or subtract the number from the character's current HP when you hit enter. 

If a character takes damage, update its HP by entering `-` followed by the damage it takes. When you hit enter, the table will automatically update the character's zone and its position within that zone.

<!-- TODO: update zone, position manually -->

<script src="../pro-bending-tracker.js"></script>