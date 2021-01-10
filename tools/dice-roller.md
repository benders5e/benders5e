---
layout: page
title: Dice Roller
permalink: /tools/dice/
parent: Tools
---

Type your die formula in the text box below and press "roll" to see the result.

<details>
<summary>Format</summary>
<code>MdN</code> where <code>M</code> is the number of dice to roll and <code>N</code> is the number of sides on the dice. Formulas can be joined by <code>+</code>, e.g. <code>1d20 + 2 + 3d6</code>. Use <code>k</code> for <span style="font-style: italic">keep:</span> <code>2d20k1</code> rolls two 20-sided dice and keeps the highest roll. Use <code>r</code> for reroll with comma separation: <code>3d6r1,2</code> rolls three 6-sided dice, rerolling 1s and 2s. When using both <code>k</code> and <code>r</code>, place <code>r</code> before <code>k</code>.
</details>

<!--form name="diceRollForm" onsubmit="return rollDice()"-->
<input type="text" id="die-formula" name="die-formula">
<input type="submit" id="submit" value="Roll">

<p id="result"></p>
<script src="../dice.js"></script>