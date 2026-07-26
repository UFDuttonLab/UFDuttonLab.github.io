---
layout: page
title: Policies
subtitle: How this lab operates
---

These are the policies the Dutton Lab works to.

Each policy carries an effective date and a last-reviewed date, cites its sources, and is reviewed at least annually.

**Where the University of Florida, a funding agency, or Kenyan law already sets a rule, we point to it rather than restate it, and we do not write stricter lab-level versions of it.** These policies cover matters those rules do not address.

<style>
  /* Policy titles are headings first, links second. Scoped to this page. */
  h3 a, h3 a:visited { color: #404040; text-decoration: none; border-bottom: 1px solid #d8d8d8; }
  h3 a:hover, h3 a:focus { color: #0085A1; border-bottom-color: #0085A1; }
</style>

{% for policy in site.data.policies %}
### [{{ policy.title }}]({{ policy.url }})

{{ policy.summary }}
{% endfor %}

## Guidance

### [Reproducibility Handbook](/reproducibility/)

Preparing a computational manuscript for submission: pinning package versions with renv, setting up the repository, the metadata files, depositing at Zenodo and NCBI SRA, cross-linking the DOIs, and the Data Availability Statement. Includes a public example repository.

---

*Corrections may be submitted by anyone, including people outside the lab, by email to the PI.*
