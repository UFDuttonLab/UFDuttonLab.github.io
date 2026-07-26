---
layout: page
title: Reproducibility Handbook
permalink: /reproducibility/
---

*Guidance, not policy. Last updated April 2026.*

---

This is how we prepare a computational manuscript for submission: reproducible code, archived data, and permanent DOIs that still resolve in ten years. It is what we aim for on every paper.

It sits alongside the [Data and Code Management Policy](/data-management/) rather than replacing it. The policy sets the requirement, including the three-archive architecture described in section 3. This handbook is the worked method, and it is deliberately specific: exact commands, file templates, and the mistakes that have already cost us time.

The workflow below was developed on Dutton et al., *Gut Microbiome in Infancy Predicts Malaria Susceptibility*, and the resulting repository is public if you want a complete example to copy from: [UFDuttonLab/congo-malaria-microbiome](https://github.com/UFDuttonLab/congo-malaria-microbiome).

Steps change when GitHub, Zenodo, or NCBI change their interfaces. If something here no longer matches what you see on screen, the screen is right; tell us and we will fix the page.

## Contents

- [1. Overview and goals](#1-overview-and-goals)
- [2. Before you start: prerequisites and accounts](#2-before-you-start-prerequisites-and-accounts)
- [3. The three-archive architecture](#3-the-three-archive-architecture)
- [4. Pinning R package versions with renv](#4-pinning-r-package-versions-with-renv)
- [5. Setting up the GitHub repository](#5-setting-up-the-github-repository)
- [6. Preparing the archive metadata files](#6-preparing-the-archive-metadata-files)
- [7. Depositing data at Zenodo](#7-depositing-data-at-zenodo)
- [8. Linking GitHub to Zenodo and creating releases](#8-linking-github-to-zenodo-and-creating-releases)
- [9. Cross-linking the Zenodo records](#9-cross-linking-the-zenodo-records)
- [10. Depositing raw sequence reads at NCBI SRA](#10-depositing-raw-sequence-reads-at-ncbi-sra)
- [11. Writing the manuscript Data Availability Statement](#11-writing-the-manuscript-data-availability-statement)
- [12. Post-acceptance updates](#12-post-acceptance-updates)
- [13. Lessons learned and common pitfalls](#13-lessons-learned-and-common-pitfalls)
- [14. Quick reference checklist](#14-quick-reference-checklist)
- [Appendix A: Example file templates](#appendix-a-example-file-templates)
- [Appendix B: Troubleshooting](#appendix-b-troubleshooting)

## 1. Overview and goals

When you submit a manuscript that uses sequencing data and computational analysis, peer reviewers and readers need to be able to:

1.  Read your raw sequencing reads (to re-do the processing if they want)

1.  Get the processed data object (to re-do the analysis without re-processing raw reads)

1.  Get the complete analysis pipeline (to reproduce every figure and statistic)

1.  Install the exact package versions you used (because package updates change results)

Meeting all four requires three separate archives with distinct roles. This handbook walks through setting them up once at submission time, with one metadata update at acceptance.

**Total time investment for a new manuscript**: 3–5 hours spread across a week, mostly waiting for renv to install packages and for Zenodo/SRA to process uploads.

## 2. Before you start: prerequisites and accounts

### Required accounts (all free)

- **GitHub**: individual account for each lab member (https://github.com/signup), plus a lab organization account (e.g., `UFDuttonLab`). See “Lab-first GitHub structure” below for why both.
- **Zenodo**: one account per lab, linked to the lab’s GitHub organization. Sign in with GitHub to auto-link.
- **NCBI**: https://submit.ncbi.nlm.nih.gov. Needed for SRA deposits. Typically the PI or lab data manager holds the account.
- **ORCID iD**: https://orcid.org, one per co-author. Zenodo can pull author metadata from ORCID and publishers increasingly require them.

### Lab-first GitHub structure (important: read before first repo)

**Publication repositories should live under a lab organization account, not a personal account.** Four reasons:

1.  **Personnel turn over; the lab persists.** A postdoc’s personal account in 2026 may not exist in 2030, or may be renamed, or may become inactive. Journals and readers expect persistent URLs for at least the ~10-year lifetime of a paper. Lab-owned = lab-persistent.

1.  **The DOI citation points to one place.** Zenodo archives whichever repository triggered the release. If the canonical version is on a personal account and the lab’s is a fork, the DOI cites the personal account. Put the lab as the authoritative source from day one.

1.  **Lab branding and discoverability.** A reviewer looking at `github.com/UFDuttonLab/repo-name` sees the lab. A reviewer looking at `github.com/some-alumnus/repo-name` has no idea which lab this is. The lab org page also shows related projects, useful context for readers.

1.  **Issue and maintenance continuity.** If someone opens an issue in 2028 (“I can’t reproduce Figure 3”), it should land in the lab’s queue, not with a postdoc who left two years ago.

### Giving lab members access without giving away the keys

GitHub Organizations have two independent permission tiers. Use both to give people what they need without handing over full control.

**Organization-level roles** (apply to the whole lab org):

- **Owner**: can delete repos, add/remove members, change billing, everything. The PI is this. **One backup Owner** (e.g., lab manager or senior co-PI) is wise in case the PI is unavailable. Do not hand this out further.

- **Member**: can see private repos they’re added to, can be added to Teams. No admin powers. This is the default for lab members.

**Per-repository roles** (set separately on each repo for each person or Team):

- **Read**: view and clone. For alumni or external auditors.

- **Triage**: manage issues but not code.

- **Write**: push commits, create branches, open pull requests. **This is the right role for most active lab members.**

- **Maintain**: Write + manage some repo settings. Good for a designated “lab code steward.”

- **Admin**: can do anything with the repo including delete it. Do not hand this out.

**Recommended setup for most labs:**

| Person                                | Org role                      | Per-repo role                  | Rationale                                  |
|---------------------------------------|-------------------------------|--------------------------------|--------------------------------------------|
| PI                                    | Owner                         | Admin                          | Lab runs on their credentials              |
| One backup (co-PI, lab manager)       | Owner                         | Admin                          | Availability insurance                     |
| Active postdocs and grad students     | Member                        | Write                          | Can push to manuscripts they’re working on |
| Rotation students, summer researchers | Member                        | Write (on specific repos only) | Scoped access for their projects           |
| Alumni and former lab                 | Member → removed at departure | Read (or nothing)              | Preserves credit, removes active access    |

**Three-step setup for a new lab member:**

1.  **Invite them to the organization.** Go to the lab org page (e.g., `https://github.com/UFDuttonLab`) → **People** tab → **Invite member**. Enter their username or email. Choose **Member** as the org role (not Owner). They get an email and need to accept.

1.  **Add them to specific repositories.** Go to the repo → **Settings** → **Collaborators and teams** → **Add people**. Choose **Write** access for most people. Send invitation.

1.  **(Optional but recommended) Set up a Team.** If you have multiple active lab members, create a Team (`Teams` tab → `New team`), add people to it, and add the Team (instead of individuals) to each repo with Write access. New lab members get access to all team-linked repos with one action.

**What a lab member with Write access can do:**

Clone and push commits, create branches, open pull requests, cut releases (which triggers Zenodo archiving). Their commits appear on the repo contributors list with their name and photo, credit is preserved automatically.

**What they cannot do:**

Delete the repository, change visibility, add or remove collaborators, modify repo settings, touch any repo they’re not added to, or administer the org.

**Branch protection for extra safety.** For public-facing publication repos where an accidental force-push would be embarrassing, add a branch protection rule: repo → **Settings** → **Branches** → **Add branch protection rule** → pattern `main` → check “Require a pull request before merging” (and optionally “Require approvals”). Now nobody, including you, can push directly to `main`; changes come in via pull request and get reviewed before merge.

**Revoking access when someone leaves.** When a lab member departs:

1.  Repo → Settings → Collaborators → find the person → **Remove**

1.  Org → People → find the person → **Remove from organization**

Their existing commits stay in the git history (credit preserved) but they can no longer push or view private repos. For public repos, you may choose to keep them as a Member with Read access indefinitely so they can still reference their own code, your call.

### Required software on your computer

- **R** (≥ 4.3) and **RStudio**

- **Git**: install from https://git-scm.com/downloads, or use **GitHub Desktop** (easier): https://desktop.github.com

- **Pandoc**: bundled with RStudio, no separate install needed

### One-time lab decisions

- **Licensing**: For most academic code, MIT license for code and CC-BY 4.0 for data are standard. If your institution requires something different (some grants or UF Innovate agreements do), ask your technology transfer office before the first deposit.

- **Authorship conventions**: Same author order on Zenodo as on the manuscript. Same affiliations. Decide early whether lab personnel who contributed but aren’t paper authors should appear in `Contributors` rather than `Creators`.

### A word on OneDrive

If your lab stores files in OneDrive (common at UF), putting a git repository inside a OneDrive-synced folder usually works but occasionally causes “file in use” errors when OneDrive and git both touch a file at the same time. If you hit these, pause OneDrive sync for the duration of a commit and resume after. Consider keeping future repositories outside OneDrive (e.g., in `C:\Users\yourname\Documents\GitHub\`) to avoid the issue entirely.

## 3. The three-archive architecture

Every deposit in this workflow sits in exactly one of three places, each with a specific role:

| Archive                  | Holds                                                                 | DOI provided?       | Released when?                                 |
|--------------------------|-----------------------------------------------------------------------|---------------------|------------------------------------------------|
| **NCBI SRA**             | Raw sequencing reads (FASTQ)                                          | No (accession only) | On a date you choose; typically at publication |
| **Zenodo, data record** | Processed data files (e.g., phyloseq `.rds`, metadata CSV)            | Yes (permanent DOI) | Immediately upon publishing the Zenodo record  |
| **Zenodo, code record** | Snapshot of GitHub repository (Rmd, HTML, renv.lock, README, LICENSE) | Yes (permanent DOI) | Immediately upon cutting a GitHub release      |

**Why three separate archives?**

- **Raw reads are huge** (sometimes hundreds of GB) and need a specialized repository with metadata standards for sequencing data. SRA is the standard.

- **Processed data is medium-sized** (usually \<1 GB) and benefits from DOI citability but doesn’t belong in a version-controlled code repository.

- **Code is small** but changes over time, needs version control (git), and benefits from being viewable and forkable on GitHub while still having a permanent archive (Zenodo).

The three archives are **cross-linked via related identifiers** so that a reader arriving at any one of them can navigate to the others.

## 4. Pinning R package versions with renv

Package versions matter. A call to `randomForest::randomForest()` in 2024 may produce different numerical results in 2026 if the package’s internal algorithms were updated. To guarantee reproducibility, you pin the exact version of every R package you used.

### Initial setup (once per project)

1.  Open your analysis `.Rmd` in RStudio. This sets the working directory to the project folder.

1.  Install renv if needed:

- install.packages("renv")

1.  Initialize renv in the project:

- renv::init()

- When prompted, choose **“Explicit”** mode. renv scans your Rmd for `library()` calls, identifies every package used, and records the version currently installed in `renv.lock`. This takes 5–20 minutes depending on how many packages you use.

1.  After initialization you’ll see three new items:

    - `renv.lock`: JSON file listing every package and its version. **Commit to git.**

    
    - `renv/activate.R`: short script that activates renv when the project opens. **Commit to git.**

    
    - `renv/library/`: actual installed packages. **Do NOT commit.** This is listed in the handbook’s standard `.gitignore` (Section 6).

    
    - `.Rprofile`: one-line file that runs `renv/activate.R` on startup. **Commit to git.**

### Adding or updating packages during development

If you install a new package after init:

    install.packages("newpackage")
    renv::snapshot()   # updates renv.lock to include the new package

If you want to update a package to a newer version:

    renv::update("packagename")   # updates to latest CRAN version
    renv::snapshot()              # records the new version in renv.lock

**Rule**: before you send the manuscript to reviewers or co-authors, run `renv::snapshot()` one final time to capture the state of the packages you actually used for the final knit.

### Special cases

**Bioconductor packages**: renv handles these automatically but records the Bioconductor release version in `renv.lock`. No special action needed.

**GitHub packages** (e.g., `microeco` from CaoLab, `splinectomeR` from RRShieldsCutler): renv records the specific commit SHA. If the GitHub repo is deleted, restoration will fail, cite your Zenodo archive as the primary source of truth regardless.

**Windows, macOS, Linux differences**: `renv::restore()` handles these transparently by fetching the right binary for the user’s platform.

### Restoration (what a reader does)

Someone who wants to reproduce your analysis runs:

    install.packages("renv")
    renv::restore()

and gets the exact package versions you used, installed locally to the project’s `renv/library/`. This does not affect their system-wide R installation.

## 5. Setting up the GitHub repository

### Decide on a repo name

Short, lowercase, hyphen-separated, descriptive of the study, not the manuscript title. Examples: - `congo-malaria-microbiome` - `ifn-gamma-pregnancy-rnaseq` - `mouse-gut-aging-cohort`

Avoid dates, PI names, and journal names. Those change; the study topic doesn’t.

### Create the repo on GitHub

1.  Log into GitHub as the lab organization account (e.g., `UFDuttonLab`).

1.  Click **+** → **New repository**.

1.  Fill in:
    - **Repository name**: the name you decided on

    
    - **Description**: “Analysis pipeline for \[Surname et al.\], \[Short Title\] (\[Journal\], \[Year\])”

    
    - **Public** (required for Zenodo free archiving)

    
    - **Do NOT** initialize with README, .gitignore, or license: you’ll add custom versions of these yourself

1.  Click **Create repository**.

### Recommended folder structure

    your-repo-name/
    ├── 01_sequence_processing/     # Upstream data processing (if applicable)
    │   ├── <preprocessing>.Rmd
    │   └── <preprocessing>.html
    ├── 02_analysis/                 # Main analysis
    │   ├── <analysis>.Rmd
    │   ├── <analysis>.html
    │   └── <analysis>_files/        # Supporting images for the HTML
    ├── renv/                        # renv library cache (partially gitignored)
    │   └── activate.R
    ├── .Rprofile
    ├── .gitignore
    ├── .zenodo.json
    ├── CITATION.cff
    ├── LICENSE
    ├── README.md
    ├── renv.lock

Numbered prefixes (`01_`, `02_`) make the pipeline stages visible at a glance and sort correctly in any file browser.

### Clone the repo locally

In GitHub Desktop: **File** → **Clone repository** → choose your new repo → pick a local path (avoid OneDrive if possible).

In command-line git:

    git clone https://github.com/YourOrg/your-repo-name.git
    cd your-repo-name

Now you have an empty local folder ready to populate.

## 6. Preparing the archive metadata files

Before the first commit, create these files at the root of the repo. Copy-paste each template below and customize.

### `.gitignore`

Tells git what NOT to track. The leading dot matters, hidden file on Unix. (On Windows, some file managers strip the dot when copying; double-check before committing.)

    # History files
    .Rhistory
    .Rapp.history

    # Session Data files
    .RData
    .RDataTmp

    # User-specific files
    .Ruserdata

    # RStudio files
    .Rproj.user/
    *.Rproj

    # knitr and R markdown cache
    *_cache/
    /cache/

    # R Environment Variables
    .Renviron

    # renv, keep the lockfile, ignore the library
    renv/library/
    renv/local/
    renv/cellar/
    renv/lock.R
    renv/python/
    renv/staging/

    # Large data files, deposit to Zenodo, do not commit
    *.rds
    *.RData

    # macOS
    .DS_Store

    # Windows
    Thumbs.db
    ehthumbs.db

    # Editor backups
    *.bak
    *.swp
    *~

### `LICENSE`

Standard MIT license. Replace the `[YEAR]` and `[AUTHORS]` placeholders.

    MIT License

    Copyright (c) [YEAR] [AUTHORS]

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

### `.zenodo.json`

Zenodo reads this file on every GitHub release to auto-populate DOI metadata. Written once, changed rarely. **IMPORTANT: Do NOT include placeholder DOIs**, Zenodo’s validator rejects them and the release archiving fails. Either include real DOIs, or leave `related_identifiers` empty until you have them.

    {
      "title": "Analysis pipeline for '[Short Title]'",
      "description": "<p>R Markdown pipeline reproducing all figures, tables, and statistical results for the manuscript [Surname] et al., '[Full Title],' currently under review at [Journal].</p><p>[One paragraph describing inputs, methods, what the pipeline reproduces.]</p><p>Exact package versions are pinned via renv.lock. Restore the environment with renv::restore() and knit [Analysis].Rmd.</p>",
      "upload_type": "software",
      "creators": [
        {
          "name": "Surname, Given Names",
          "affiliation": "University of Florida"
        }
      ],
      "keywords": [
        "keyword1",
        "keyword2"
      ],
      "license": "MIT",
      "access_right": "open",
      "related_identifiers": [],
      "communities": []
    }

### `CITATION.cff`

GitHub reads this and adds a “Cite this repository” button to the repo page.

    cff-version: 1.2.0
    title: "Analysis pipeline for '[Short Title]'"
    message: "If you use this pipeline, please cite the Zenodo archive (DOI below) and the associated manuscript."
    type: software
    authors:
      - family-names: Surname
        given-names: Given Names
        affiliation: University of Florida
    keywords:
      - keyword1
      - keyword2
    license: MIT
    repository-code: "https://github.com/YourOrg/your-repo-name"

### `README.md`

The README is the public-facing front door to the repository. Its audience is reviewers and future readers, not you. Good README structure:

1.  One-line study description and authors

1.  Submission status / journal

1.  Repository structure (diagram or bulleted list: see the example repo)

1.  Pipeline overview (which Rmd does what)

1.  Data availability section with all three archive links

1.  “Reproducing the analysis” step-by-step (prerequisites, clone, renv restore, knit)

1.  Package inventory (CRAN / Bioconductor / GitHub lists)

1.  Citation (code DOI, data DOI, manuscript)

1.  Contact (corresponding author)

See https://github.com/UFDuttonLab/congo-malaria-microbiome for a worked example.

**Tip on markdown code blocks**: if you want to show a folder tree, use a bulleted list rather than a triple-backtick code block containing indentation-sensitive ASCII art, renders more reliably across GitHub, GitLab, and markdown preview tools.

## 7. Depositing data at Zenodo

This is where the processed data files go, the `.rds`, `.csv`, or similar files that are the **inputs** to your analysis pipeline but are too large (or not appropriate) for git.

### Step-by-step

1.  Log into Zenodo. Click **+ New upload** (top right).

1.  **Upload files**: drag-drop both your processed data files and the metadata CSV. Don’t upload raw FASTQs here, those go to SRA.

1.  **Upload type**: Dataset.

1.  **Title**: Follow the pattern `Data for: [Short Title]`. Keep it short. This is citable text.

1.  **Creators**: Add every co-author in manuscript byline order. Use the format `Surname, Given Names` (comma-inverted). Add ORCID iDs where available.

1.  **Description**: HTML-formatted. Describe:

    - The study (one sentence: who, what, where, when)

    
    - What’s in each file (one bullet per file, with a brief description of rows/columns/variables)

    
    - That these files are inputs to the code pipeline (cross-reference the code DOI if you have it; add later via metadata edit if not)

    
    - Where raw reads are (SRA BioProject, with note about release timing)

1.  **License**: **Creative Commons Attribution 4.0 International (CC-BY 4.0)** for data.

1.  **Keywords**: Same list as `.zenodo.json`.

1.  **Related identifiers** (skip anything you don’t have yet; can be edited later):

    - **Code archive**: identifier = Zenodo DOI of code, relation = “is supplemented by”, resource type = Software

    
    - **Raw reads**: identifier = SRA BioProject accession, relation = “is derived from”, resource type = Dataset

    
    - **Manuscript** (add post-acceptance): identifier = Journal DOI, relation = “is supplement to”, resource type = Publication → Journal article

1.  **Funding**: add grants that supported the work. Zenodo has NIH and NSF integrated with grant-number search.

1.  Click **Save** to save a draft.

1.  Proof-read once. Click **Publish**.

### Critical things to know about Zenodo publishing

- **Files are permanent once published.** You cannot add, remove, or replace uploaded files after clicking Publish. Triple-check file names and contents before publishing.

- **Metadata is editable forever.** Title, description, authors, keywords, related identifiers, all of these can be updated at any time and don’t affect the DOI.

- **Pre-acceptance wording**: do not say “published in \[Journal\], \[Year\]” when the paper isn’t accepted yet. Use “currently under review at \[Journal\]” instead. Update on acceptance.

- **The DOI appears immediately** after publishing. It will look like `10.5281/zenodo.19634458`. Copy it and save it, you’ll need it multiple times.

## 8. Linking GitHub to Zenodo and creating releases

### One-time account linking

1.  Log into Zenodo.

1.  Click your name (top-right) → **GitHub**.

1.  On the page that appears, find your repository in the list.

1.  Flip the toggle next to it from **Off** to **On**.

From this moment on, every GitHub release you publish will be archived at Zenodo and get a DOI.

### Pushing your local work to GitHub

Before cutting a release, make sure everything is committed and pushed. In GitHub Desktop:

1.  Open your repository.

1.  Click the **Changes** tab. Review the file list.

1.  At the bottom-left, enter a commit summary (e.g., `Initial submission pipeline`) and optional description.

1.  Click **Commit to main**.

1.  Click **Push origin** at the top.

1.  Verify on GitHub by reloading the repo page in a browser.

### Cutting the release

1.  On your GitHub repo page, find the right sidebar → **Releases** → **Create a new release** (or go to `https://github.com/YourOrg/your-repo-name/releases/new`).

1.  **Choose a tag**: type `v1.0.0` and click “Create new tag on publish”. (Use semantic versioning: `major.minor.patch`. v1.0.0 is first public release.)

1.  **Release title**: short, descriptive, e.g., “Initial submission pipeline”.

1.  **Describe this release**: markdown is supported. Cover:

    - What’s in this release (brief)

    
    - Cross-references to the Zenodo data DOI and SRA (even if still embargoed)

    
    - Instructions for reproduction (one paragraph: “See README.md”)

1.  **Checkboxes**:

    - Pre-release: **unchecked**

    
    - Set as latest release: **checked**

    
    - Create a discussion: **unchecked**

1.  Click **Publish release**.

### What happens next

Within 1–5 minutes: - GitHub sends Zenodo a webhook about the new release - Zenodo grabs a zip snapshot of your repo at the release tag - Zenodo reads `.zenodo.json` and populates DOI metadata - Zenodo publishes a new record and mints a DOI - You get an email from Zenodo

Verify by going to https://zenodo.org/account/settings/github/, you should see a DOI badge next to your repo name.

**If the release shows “Failed” on Zenodo**: the most common cause is a malformed `.zenodo.json` (invalid field value or placeholder DOI). Click the failed release for an error message, fix `.zenodo.json` locally, commit, push, delete the failed release + its tag on GitHub, and re-cut the release with the same tag.

## 9. Cross-linking the Zenodo records

After both Zenodo records exist, add “related identifier” entries on each one pointing to the other.

### Adding code DOI to the data record

1.  Go to https://zenodo.org → Dashboard → your data record.

1.  Click **Edit**.

1.  Scroll to **Related/alternate identifiers** → **+ Add**.

1.  Identifier: code DOI (e.g., `10.5281/zenodo.19634438`), Relation: `is supplemented by`, Resource type: `Software`.

1.  Click **Publish**. This creates a new metadata version; files are unchanged.

### Adding data DOI to the code record

1.  Go to Dashboard → your code record (auto-created by GitHub integration).

1.  Click **Edit**.

1.  Same procedure: Identifier: data DOI, Relation: `supplements`, Resource type: `Dataset`.

1.  Click **Publish**.

### Automating this for the future

You can include related identifiers in `.zenodo.json` so they’re set automatically on every release:

    "related_identifiers": [
      {
        "relation": "isSupplementedBy",
        "identifier": "10.5281/zenodo.XXXXXXX",
        "resource_type": "dataset"
      }
    ]

This only works if you already have the data DOI at the time you cut the release, otherwise you’re back to manual editing post-release.

## 10. Depositing raw sequence reads at NCBI SRA

Separate system from Zenodo. SRA deposits take longer to process (several days to a week) and have much stricter metadata requirements, so start this early.

### Workflow

1.  Log into https://submit.ncbi.nlm.nih.gov.

1.  Create a **BioProject** record. This is the top-level container for the study. You’ll get an accession like `PRJNA903474`.

1.  Create one or more **BioSample** records for each biological sample. These describe the organism, tissue, host, collection date, etc.

1.  Create an **SRA** submission linking the FASTQ files to the BioSamples.

1.  Upload FASTQ files via FTP or Aspera (NCBI provides per-submission credentials).

### Release date

SRA lets you specify a release date up to four years in the future. Standard practice: set it to ~6 months after submission, then email `sra@ncbi.nlm.nih.gov` once the paper has a confirmed acceptance or page proofs to update the release date to the actual publication date.

Example email: \> Dear NCBI SRA team, \> \> Please update the release date for BioProject PRJNAXXXXXX to \[new date\] to coincide with publication of the associated manuscript in \[Journal\], DOI \[10.xxxx/xxxxx\]. \> \> Thank you, \> \[Name\]

### Deliverable for the manuscript

The **BioProject accession** (e.g., `PRJNA903474`) is what you cite. It looks like `PRJNA` + seven digits. Do not cite individual SRA/SRR numbers in the manuscript, the BioProject is the stable entry point that resolves to all the child records.

## 11. Writing the manuscript Data Availability Statement

### Template

> The datasets generated and analyzed for this study have been deposited in multiple repositories to support reproducibility. Raw \[sequencing platform\] reads are deposited with the NCBI Sequence Read Archive under BioProject accession \[PRJNAXXXXXX\] and will be released upon publication of this work. The processed \[data file type\] and associated metadata supporting the analyses reported here are archived at Zenodo (https://doi.org/10.5281/zenodo.XXXXXXX). The \[R/Python/Julia\] analysis pipeline, with exact package versions pinned for reproducibility, is archived at Zenodo (https://doi.org/10.5281/zenodo.YYYYYYY) with ongoing development at https://github.com/YourOrg/your-repo-name.

### Additional Methods section sentence (Frontiers explicitly recommends this)

Add to the end of the Methods, typically in the Statistical Analysis subsection:

> All analyses were performed in R (version 4.3 or later). The complete analysis pipeline, with exact package versions pinned via renv for reproducibility, is archived at Zenodo (https://doi.org/10.5281/zenodo.YYYYYYY).

### Which DOI to cite

Zenodo mints two types of DOIs:

- **Version DOI**: points to a specific release (e.g., v1.0.0 or v1.0.1). Changes with each new release.

- **Concept DOI**: always points to the latest version. Shown on every Zenodo record’s right sidebar as “Cite all versions? You can cite all versions by using the DOI X. This DOI represents all versions, and will always resolve to the latest one.”

**In the manuscript, cite the concept DOI.** It won’t go stale when you update the repository post-acceptance.

## 12. Post-acceptance updates

Once the journal accepts the manuscript and assigns a DOI, three metadata updates close the loop.

### Update 1: .zenodo.json in the repo

Edit `.zenodo.json` and add the journal DOI as a related identifier:

    "related_identifiers": [
      {
        "relation": "isSupplementedBy",
        "identifier": "10.5281/zenodo.XXXXXXX",
        "resource_type": "dataset"
      },
      {
        "relation": "isSupplementTo",
        "identifier": "10.XXXX/journal.YYYYY",
        "resource_type": "publication-article"
      }
    ]

Also update the description if it says “currently under review”, change to the published citation.

### Update 2: Cut v1.0.1 release

Commit the `.zenodo.json` change and cut a new release: - Tag: `v1.0.1` - Title: “Post-acceptance update, journal DOI added” - Description: brief note that this is a metadata-only update, no analysis changes.

Zenodo will mint a new version DOI automatically. The concept DOI (which you cited in the manuscript) now points to this new version.

### Update 3: Zenodo data record

Edit the data record metadata: 1. Change “currently under review” language to the published citation 2. Add the journal DOI as a related identifier (relation: “is supplement to”) 3. Publish the metadata update

### Update 4: SRA release date

Email `sra@ncbi.nlm.nih.gov` to release the raw reads on the publication date (or confirm they’re already released).

## 13. Lessons learned and common pitfalls

### On dotfiles

Files starting with `.` (like `.gitignore` and `.zenodo.json`) are “hidden files” on Unix systems. On Windows, some file copying operations strip the leading dot. If you create these files through GitHub’s web interface, the dots will be preserved. If you create them in File Explorer by renaming, Windows may warn you; click “Yes” to keep the name as entered.

**Check after first commit**: go to your repo’s main page on GitHub and verify these show with leading dots. If they show as `gitignore` and `zenodo.json` (no dots), neither is doing its job and you need to rename.

### On placeholder DOIs in .zenodo.json

Never include placeholder text like `"TO_BE_UPDATED_WITH_JOURNAL_DOI"` in related_identifiers. Zenodo’s validator will reject the whole release. Either include real DOIs or leave `related_identifiers` as `[]` until you have them.

### On the cache trap in Rmd compilations

If your Rmd uses `cache = TRUE`, cached chunks preserve state from previous knits, including stale object values and masked function namespaces. After any code changes, **delete the cache folder** (`rm -rf <rmd_name>_cache/`) before re-knitting to verify the manuscript text matches a clean knit’s output. Cache-related discrepancies are silent and hard to debug after submission.

### On Zenodo file immutability

Files on Zenodo are permanent after publishing. You cannot fix a typo in a `.rds` file or add a missing metadata column later. **Verify file contents before clicking Publish.** If you catch an error post-publication, the recommended practice is to upload a corrected version as a new record and link the old record to it via related identifiers, not to delete the old record.

### On OneDrive + git conflicts

If you’re storing your repo in a OneDrive-synced folder and see errors like “could not lock ref” or “file in use”, pause OneDrive sync temporarily. Better: keep future repositories outside OneDrive.

### On author affiliations

Match the manuscript byline exactly. If the manuscript uses “University of Florida” as a short form in Zenodo but the title page shows “Department of Infectious Diseases and Immunology, College of Veterinary Medicine, University of Florida”, use the full form on Zenodo too. Reviewers and later readers use these affiliations to identify authors.

### On renv + Bioconductor

Bioconductor packages are version-locked by Bioconductor release number (e.g., 3.18). renv handles this, but `renv::restore()` on a different Bioconductor release than yours may install a different package version. Note your Bioconductor release version in the README if anyone is likely to be on a different release.

### On co-author review

Before submission, share the GitHub repo URL with co-authors and ask them to try `renv::restore()` and knit the Rmd on their own machines. This catches platform-specific bugs, missing files, and documentation gaps. A co-author who can’t reproduce your analysis is a test run of what reviewers will experience.

## 14. Quick reference checklist

Copy this into your project management tool and check off as you go.

### Pre-submission (first time per manuscript)

- [ ] Accounts exist: GitHub (personal + lab org), Zenodo (linked to GitHub), NCBI, ORCID

- [ ] Lab org has one backup Owner (co-PI or lab manager) for availability insurance

- [ ] Lab members invited to the org as Members (not Owners)

- [ ] Local software installed: R ≥ 4.3, RStudio, Git or GitHub Desktop

- [ ] `renv::init()` run; `renv.lock`, `renv/activate.R`, `.Rprofile` created

- [ ] Repository created on GitHub under the **lab organization account** (public, no auto-initialized files)

- [ ] Relevant lab members added to the repo with **Write** access (not Admin)

- [ ] Branch protection configured on `main` (optional but recommended for publication repos)

- [ ] Local clone of repo in a non-OneDrive location (if possible)

- [ ] `.gitignore` created (with leading dot)

- [ ] `LICENSE` file added (MIT or lab-chosen license)

- [ ] `.zenodo.json` created (no placeholder DOIs)

- [ ] `CITATION.cff` created

- [ ] `README.md` written (with pipeline overview, data availability section, reproduction steps)

- [ ] Folder structure set up (`01_sequence_processing/`, `02_analysis/`, etc.)

- [ ] Rmd files placed in correct subfolders

- [ ] Everything committed and pushed to GitHub

- [ ] Zenodo ↔ GitHub integration toggled **On** for this repo

- [ ] Data files uploaded to Zenodo as **dataset** record

- [ ] Data record published; data DOI recorded

- [ ] NCBI SRA submission created; BioProject accession recorded; release date set

- [ ] v1.0.0 GitHub release cut; Zenodo archiving succeeded; code DOI recorded

- [ ] Concept DOI identified (from Zenodo code record sidebar)

- [ ] Cross-links added: data record → code DOI; code record → data DOI

- [ ] Manuscript Data Availability Statement updated with both DOIs + SRA accession

- [ ] Manuscript Methods section has code availability sentence

- [ ] Co-author test: at least one co-author runs `renv::restore()` + knit on their own machine

### Post-acceptance

- [ ] Update `.zenodo.json` with journal DOI

- [ ] Commit, push, cut v1.0.1 release

- [ ] Update data record metadata on Zenodo (description wording, journal DOI as related identifier)

- [ ] Email NCBI SRA to update release date if needed

- [ ] Verify DOIs resolve: data DOI, concept DOI for code, journal DOI all point to the right places

## Appendix A: Example file templates

Customize templates for your specific manuscript. Worked examples:

- `.gitignore`, `LICENSE`, `.zenodo.json`, `CITATION.cff`, `README.md`, see https://github.com/UFDuttonLab/congo-malaria-microbiome

- `renv.lock`: auto-generated by `renv::snapshot()`; don’t write by hand

## Appendix B: Troubleshooting

### “Zenodo release failed”

Most common cause: malformed `.zenodo.json`. Click the failed release on Zenodo for the error message. Common fixes: - Remove placeholder DOIs from `related_identifiers` - Ensure JSON syntax is valid (run through https://jsonlint.com) - Ensure `license` value matches a Zenodo-recognized string (use “MIT”, not “MIT License”)

### “renv::restore() fails with compilation errors”

Usually means a system library is missing (not an R package). On Debian/Ubuntu, install:

    sudo apt-get install libcurl4-openssl-dev libssl-dev libxml2-dev \
      libfontconfig1-dev libharfbuzz-dev libfribidi-dev libfreetype6-dev \
      libpng-dev libtiff5-dev libjpeg-dev

On macOS: usually handled by Xcode command line tools (`xcode-select --install`).

### “GitHub Desktop shows no changes but I added files”

OneDrive sync delay. Wait 30 seconds and check again. Or pause OneDrive sync.

### “Hard refresh doesn’t update GitHub repo view”

GitHub uses CDN caching. After pushing, the repo page can take up to 60 seconds to reflect changes, even with Ctrl+F5. Try private/incognito mode to bypass browser cache.

### “Co-author can’t reproduce my knit”

First-order checks, in this order: 1. Did they run `renv::restore()` successfully? 2. Are they on the same major R version (≥ 4.3)? 3. Are they on the same major Bioconductor release? 4. Did they download the Zenodo data files to the right path? 5. Does `set.seed()` appear in your Rmd at all the right places?

If steps 1–4 all pass and numbers still differ, the issue is usually a stochastic operation without a seed or a package with non-deterministic default behavior. Audit every call to sampling, permutation, ML train/test splits, UMAP, t-SNE, etc.

*End of handbook. Questions or improvements: add an issue on the example repo (https://github.com/UFDuttonLab/congo-malaria-microbiome/issues) or edit this file and submit a pull request.*
