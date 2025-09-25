---
layout: page
title: Sets by difficulty
---

This page tallies the number of quizbowl sets listed on this website for each difficulty level by year. (If data is missing, please contribute to the GitHub repository.)

{% assign y_extent = 7 %}
{% assign x_extent = site.data.sets | size %}
{% capture svg %}<svg width="{{ x_extent | times: 5 }}" height="22" viewBox="-1 -{{y_extent | plus: 1}} {{ x_extent | plus: 2 }} {{ y_extent | plus: 2}}" preserveAspectRatio="none">
<!-- <rect width="{{ x_extent }}" height="{{ y_extent }}" fill="#dcc" y="-{{y_extent}}" /> -->{% endcapture %}{% capture svgend %}</svg>{% endcapture %}

<table>
  <thead>
    <tr>
      <th>Difficulty</th>
      {% for year in site.data.sets %}
        <th><a href="/{{ year[0] }}">{{ year[0] }}–<br/>{{ year[0] | plus: 1 }}</a></th>
      {%- endfor -%}
      <th>Trend</th>
    </tr>
  </thead>
  <tbody>
    {% assign difficulties = "●|●◖|●●|●●◖|●●●|●●●◖|●●●●" | split: "|" %}
    {% for diff in difficulties %}
      {% assign counts = "" | split: "," %}
    <tr>
        <th class="{{ diff }}">{{ diff }}</th>
        {%- for year_hash in site.data.sets %}
            {%- assign year = year_hash[0] %}
            {%- assign sets_diff = site.data.sets[year] | where_exp: 'set_hash', 'set_hash.diffdots == diff' %}
            <td title="{{ sets_diff | map: 'name' | join: '
' }}">{{ sets_diff.size }}</td>
            {%- assign counts = counts | push: sets_diff.size %}
        {%- endfor %}
        <td class="sparkline">{{svg}}{% for i in counts %}<rect width="0.8" height="{{ i }}" class="{{diff}}" x="{{ forloop.index0 }}" y="-{{i}}" />{% endfor %}{{svgend}}</td>
    </tr>
    {% endfor %}
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      {% assign counts = "" | split: "," %}
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        {% assign count = site.data.sets[year] | where_exp: 'set', 'set.diffdots' | size %}
        <th>{{ count }}</th>
        {% assign counts = counts | push: count %}
      {% endfor %}
      <th class="sparkline">{{svg}}{% for i in counts %}<rect width="0.8" height="{{ i | times: 0.25 }}" fill="black" x="{{ forloop.index0 }}" y="-{{i | times: 0.25}}" />{% endfor %}{{svgend}}</th>
    </tr>
    <tr>
      <th>&le; <span class="●●◖">●●◖</span></th>
      {% assign counts = "" | split: "," %}
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        {% assign count = 0 %}
        {% for set_hash in site.data.sets[year] %}
          {% assign dots = set_hash[1].diffdots %}
          {% if dots == "●" or dots == "●◖" or dots == "●●" or dots == "●●◖" %}
            {% assign count = count | plus: 1 %}
          {% endif %}
        {% endfor %}
        <td>{{ count }}</td>
        {% assign counts = counts | push: count %}
      {% endfor %}
      <td class="sparkline">{{svg}}{% for i in counts %}<rect width="0.8" height="{{ i | divided_by: 2 }}" class="●●◖" x="{{ forloop.index0 }}" y="-{{i | divided_by: 2}}" />{% endfor %}{{svgend}}</td>
    </tr>
    <tr>
      <th>&ge; <span class="●●●">●●●</span></th>
      {% assign counts = "" | split: "," %}
      {% for year_hash in site.data.sets %}
        {% assign year = year_hash[0] %}
        {% assign high_sets = site.data.sets[year] | where_exp: 'set', 'set.diffdots contains "●●●"' %}
        <td>{{ high_sets.size }}</td>
        {% assign counts = counts | push: high_sets.size %}
      {% endfor %}
      <td class="sparkline">{{svg}}{% for i in counts %}<rect width="0.8" height="{{ i | times: 0.5 }}" class="●●●" x="{{ forloop.index0 }}" y="-{{i | times: 0.5}}" />{% endfor %}{{svgend}}</td>
    </tr>
  </tfoot>
</table>
