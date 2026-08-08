---
layout: page
title: Policies
permalink: /policies/
---

Each policy carries an effective date and a last-reviewed date, cites its sources, and is reviewed at least annually. Where UF, a funder, or Kenyan law already sets a rule, these policies point to it. They do not restate it and do not write a stricter laboratory-level version.

*Index last reviewed: August 2026.*

<style>
  /* Scoped to this page. */
  h3 a, h3 a:visited { color: #404040; text-decoration: none; border-bottom: 1px solid #d8d8d8; }
  h3 a:hover, h3 a:focus { color: #0085A1; border-bottom-color: #0085A1; }
</style>

## Policies

{% for policy in site.data.policies %}
### [{{ policy.title }}]({{ policy.url }})

{{ policy.summary }}
{% endfor %}

## Guidance

### [Reproducibility Handbook](/reproducibility/)

Preparing a computational manuscript for submission: pinning package versions with renv, setting up the repository, the metadata files, depositing at Zenodo and NCBI SRA, cross-linking the DOIs, and the Data Availability Statement. Includes a public example repository.

---

*Corrections may be submitted by anyone, including people outside the lab, by email to the PI. Substantive amendments to the Laboratory Code of Conduct are made by agreement with the laboratory rather than by unilateral revision.*
