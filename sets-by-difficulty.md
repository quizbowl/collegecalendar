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
</table>
