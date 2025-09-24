---
layout: page
title: Sets by difficulty
---

This page tallies the number of quizbowl sets for each difficulty level by year.

<table>
  <thead>
    <tr>
      <th>Difficulty</th>
      {% for year in site.data.sets %}
        <th><a href="/{{ year[0] }}">{{ year[0] }}–<br/>{{ year[0] | plus: 1 }}</a></th>
      {%- endfor -%}
    </tr>
  </thead>
  <tbody>
    {% assign difficulties = "●|●◖|●●|●●◖|●●●|●●●◖|●●●●" | split: "|" %}
    {% for diff in difficulties %}
      {% assign counts_str = "" %}
    <tr>
        <th class="{{ diff }}">{{ diff }}</th>
        {%- for year_hash in site.data.sets %}
            {%- assign year = year_hash[0] %}
            {%- assign count = 0 %}
            {%- assign sets_diff = site.data.sets[year] | where_exp: 'set_hash', 'set_hash.diffdots == diff' %}
            <td title="{{ sets_diff | map: 'name' | join: '
' }}">{{ sets_diff.size }}</td>
        {%- endfor %}
        </tr>
    {% endfor %}
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        <th>{{ site.data.sets[year].size }}</th>
      {% endfor %}
    </tr>
    <tr>
      <th>&le; <span class="●●◖">●●◖</span></th>
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        {% assign low_sets = site.data.sets[year] | where_exp: 'set', 'set.diffdots == "●" or set.diffdots == "●◖" or set.diffdots == "●●" or set.diffdots == "●●◖"' %}
        <td>{{ low_sets.size }}</td>
      {% endfor %}
    </tr>
    <tr>
      <th>&ge; <span class="●●●">●●●</span></th>
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        {% assign high_sets = site.data.sets[year] | where_exp: 'set', 'set.diffdots contains "●●●"' %}
        <td>{{ high_sets.size }}</td>
      {% endfor %}
    </tr>
  </tfoot>
</table>
