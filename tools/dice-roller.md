---
layout: default
title: Dice Roller
permalink: /tools/dice/
parent: Tools
---

There are plenty of good [dice](https://donjon.bin.sh/) [rollers](https://tacticaltokens.com/dice-roller/) on the Internet, but if for some reason you want to stay on this site, there's one below as well. 

Type your die formula in the text box below and click "Roll" to see the result.

<details>
<summary>Format</summary>
<ul>
<li><code>MdN</code> where <code>M</code> is the number of dice to roll and <code>N</code> is the number of sides on the dice. </li>

<li>Formulas can be joined by <code>+</code> or <code>-</code>, e.g. <code>1d20 - 2 + 3d6</code>. </li>

<li>Use <code>k</code> for <span style="font-style: italic">keep:</span> <code>2d20k1</code> rolls two 20-sided dice and keeps the highest roll (known as advantage). </li>

<li>Use <code>r</code> for <span style="font-style: italic">reroll</span> with comma separation: <code>3d6r1,2</code> rolls three 6-sided dice, rerolling 1s and 2s. When using both <code>k</code> and <code>r</code>, place <code>r</code> before <code>k</code>.</li>
</ul>
</details>

<!--form name="diceRollForm" onsubmit="return rollDice()"-->
<input type="text" id="die-formula" name="die-formula">
<input type="submit" id="submit" value="Roll">

<p id="result"></p>
<script>{%- include js/dice.js -%}</script>