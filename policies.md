---
layout: page
title: Policies
subtitle: How this lab operates
---

These are the policies the Dutton Lab works to. They are written to be read by two audiences at once: prospective students and collaborators deciding whether this is a lab they want to work with, and current members who need to know what is expected of them.

Each policy carries an effective date and a last-reviewed date, cites its sources, and is reviewed at least annually.

**Where the University of Florida, a funding agency, or Kenyan law already sets a rule, we point to it rather than restate it, and we do not write stricter lab-level versions of it.** These policies cover the ground those rules leave open: how this particular lab works, in the places it works, with the people in it.

{% for policy in site.data.policies %}
### [{{ policy.title }}]({{ policy.url }})

{{ policy.summary }}
{% endfor %}

## Guidance

Not policy, but how we actually do things.

### [Reproducibility Handbook](/reproducibility/)

Preparing a computational manuscript for submission: pinning package versions with renv, setting up the repository, the metadata files, depositing at Zenodo and NCBI SRA, cross-linking the DOIs, and the Data Availability Statement. Written as a worked method with a public example repository.

---

*If something in these policies is unclear, out of date, or wrong, tell us. They are living documents and corrections are welcome from anyone, including people outside the lab.*
