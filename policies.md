---
layout: page
title: Policies
subtitle: How this lab operates
---

These are the policies the Dutton Lab works to. They are written to be read by two audiences at once: prospective students and collaborators deciding whether this is a lab they want to work with, and current members who need to know what is expected of them.

Each policy carries an effective date and a last-reviewed date, cites its sources, and is reviewed at least annually.

**Where the University of Florida, a funding agency, or Kenyan law already sets a rule, we point to it rather than restate it, and we do not write stricter lab-level versions of it.** These policies cover the ground those rules leave open: how this particular lab works, in the places it works, with the people in it.

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

Preparing a computational manuscript for submission: pinning package versions with renv, setting up the repository, the metadata files, depositing at Zenodo and NCBI SRA, cross-linking the DOIs, and the Data Availability Statement. Written as a worked method with a public example repository.

---

*If something in these policies is unclear, out of date, or wrong, tell us. They are living documents and corrections are welcome from anyone, including people outside the lab.*
