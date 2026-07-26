---
layout: page
title: Data and Code Management Policy
permalink: /data-management/
---

*Effective Date: July 2026 · Last reviewed: July 2026*

---

## Purpose and Scope

This policy governs the management, documentation, storage, sharing, and retention of all research data and code produced by the laboratory. It covers amplicon and shotgun metagenomic sequence data, quantitative and digital PCR results, environmental DNA data, water chemistry and sensor time series, animal telemetry data, laboratory robotics protocols, and all analysis code.

**Raw sequence data cannot be regenerated**, and sponsor requirements changed in 2026, so the deposition and retention rules below are not discretionary. See Sponsor Requirements.

## Sponsor Requirements

### NIH

The NIH Policy for Data Management and Sharing has been in effect since 25 January 2023. It requires a DMS Plan with every application for research that generates scientific data, and does not reach training, infrastructure development, or non-research activities. It requires that scientific data be shared **as soon as possible and no later than the time of an associated publication or the end of the performance period, whichever comes first**, strongly encourages established repositories, and makes the approved Plan a **term and condition of award**.<sup>[1](#ref1),[6](#ref6)</sup>

**The Plan format changed in 2026.** For applications submitted for **due dates on or after 25 May 2026**, NIH requires the updated format set out in NOT-OD-26-046, which supersedes the six narrative elements of NOT-OD-21-014. The new format has seven largely YES/NO elements, with a **300-word maximum** on the justification of sharing limitations and a **100-word maximum** on the table of key data types and repositories, and it asks directly about Genomic Data Sharing Policy compliance and Institutional Certification.<sup>[2](#ref2),[3](#ref3),[4](#ref4),[5](#ref5)</sup>

Under the 2024 NIH Public Access Policy, in effect since **1 July 2025** (the originally announced 31 December 2025 date was brought forward by NOT-OD-25-101), Author Accepted Manuscripts must be submitted to PubMed Central **upon acceptance** and made publicly available **without embargo** on the Official Date of Publication. PMC deposit is free; the laboratory does not pay a publisher for it.<sup>[7](#ref7),[47](#ref47)</sup>

Large-scale human genomic studies must register in dbGaP under the NIH Genomic Data Sharing Policy, and human data requiring controlled access goes to dbGaP rather than SRA.<sup>[9](#ref9),[24](#ref24)</sup>

### NSF

The current base guide is **PAPPG 24-1**, effective 20 May 2024, with the Data Management and Sharing Plan requirement at Chapter II.D.2.i(ii). Two supplements amend it.<sup>[10](#ref10)</sup>

**Supplement 1 (NSF 26-200), effective 8 December 2025:** recipients are required to share **all data supporting NSF-funded publications at the time of publication**, with exceptions justified in the DMSP. The same supplement extends the research misconduct definition to explicitly encompass **AI-based tools**, and makes Research Security Training mandatory.<sup>[11](#ref11)</sup>

**Supplement 2 (NSF 26-202), effective 22 January 2026:** DMSPs are created in a **Research.gov tool rather than uploaded as a PDF**, with the tool launching 27 April 2026; the DMSP is reviewed as part of merit review; **the twelve-month publication embargo is eliminated**, with Author Accepted Manuscripts or Versions of Record deposited in NSF-PAR at or before publication; and prior Program Officer approval is required for exceptions to sharing plans.<sup>[12](#ref12),[15](#ref15)</sup>

NSF BIO guidance requires plans consistent with the **FAIR** principles, permits reference to the **CARE** principles for Indigenous data governance, expects recognised community-accepted repositories, and expects persistent identifiers such as DOIs. The BIO form covers up to four data types or research products.<sup>[13](#ref13),[16](#ref16)</sup>

Separately, PAPPG Chapter XI.D.4 requires investigators to share primary data, samples, physical collections, and other supporting materials with other researchers at no more than incremental cost and within a reasonable time.<sup>[14](#ref14)</sup>

## Metadata Standards, by Data Type

Metadata is recorded at the bench and at the sampling point, not added at the end.

| Data type | Standard | NCBI BioSample package |
| --- | --- | --- |
| Amplicon (Illumina, Nanopore) | GSC MIMARKS survey | `MIMARKS.survey.water.6.0`, `MIMARKS.survey.soil.6.0` |
| Shotgun metagenome | GSC MIMS | `MIMS.me.water.6.0`, `MIMS.me.soil.6.0` |
| Metagenome-assembled genomes | GSC MIMAG | `MIMAG` series |
| Single-amplified genomes | GSC MISAG | `MISAG.water.6.0` |
| Sensor and chemistry time series | EML 2.2.0 | Deposited at EDI, not NCBI |
| eDNA detections, telemetry occurrences | Darwin Core | Not applicable |

MIxS is a living standard; the current release is **v6.3.1, 14 July 2026**, while NCBI packages sit at the 6.0 series. **Record which version was used for each submission.**<sup>[17](#ref17),[18](#ref18),[19](#ref19),[23](#ref23)</sup>

The laboratory adopts the **Gold tier** of the published tier-based standards for FAIR sequence data and metadata sharing in microbiome research. In practice that means non-paywalled sequences with accessions in FASTQ or BCL; documented sequencing method; **PCR primer sequences recorded for every amplicon study**; no login barrier to access; an explicit data-access statement; and **analysis code published alongside the data**.<sup>[20](#ref20)</sup>

Sensor and chemistry time series are described in **Ecological Metadata Language 2.2.0** and deposited at the **Environmental Data Initiative**, validated with the EML Congruence Checker or ezEML. Note that EDI's default licence is CC0 1.0 and that **a data package that does not allow public access to both metadata and data will not receive a DOI**.<sup>[29](#ref29),[30](#ref30)</sup>

Occurrence records derived from eDNA detections or telemetry are expressed in **Darwin Core**, whose scope explicitly extends to metagenomics and genetic resources rather than being limited to museum specimens.<sup>[27](#ref27),[28](#ref28)</sup>

## After a Sequencing Run

Complete the following on the day the run finishes.

1. **Copy the complete run output to the RAID array in the PI's office.** Complete means the raw signal-level files as well as the basecalled reads: POD5, or FAST5 on older MinION runs, for Nanopore, and BCL for any outsourced Illumina run. Signal files are retained because re-basecalling with a later model requires them.
2. **Upload one working copy to `/blue`** for analysis. That is a working copy, not a second archive.
3. **Register the BioProject and BioSamples now**, with the release date set to the expected publication date, per the workflow below.

**The RAID is the first copy, not the archive.** RAID protects against a single disk failing. It does not protect against fire, theft, flood, a controller failure that takes the whole array, ransomware, or somebody deleting the wrong directory. The office and HiPerGator are also on the same campus, so neither is a meaningful backup of the other. A registered submission under hold is the only copy that is off site and independently managed.

## Deposition Workflow

**A manuscript produces three deposits, and they are cross-linked.** Raw reads go to **NCBI SRA**, which gives an accession rather than a DOI and is released on a date you set. Processed data objects go to **Zenodo** as a dataset record with a permanent DOI. Code goes to **GitHub and is archived to Zenodo** on release, also with a DOI. Each record carries related-identifier links to the other two, and all three appear in the Data Availability Statement. The step-by-step method, including the metadata file templates, is in the [Reproducibility Handbook](/reproducibility/).

**BioProject registration is mandatory** before any SRA, WGS, or TSA submission, and grant information is captured in the BioProject record so that funder reporting resolves cleanly.<sup>[21](#ref21)</sup>

Populate the SRA object model as NCBI documents it. Two rules apply: **EXPERIMENT is the primary publishable unit**, defined by the combination of library, sequencing strategy, layout, and instrument model, so it needs a real title and description rather than a filename; and **never mix samples or experiments within a single RUN**.<sup>[22](#ref22),[25](#ref25)</sup>

Standing operational rule: **register the BioProject and BioSamples at sequencing time, not at manuscript time.** Set the SRA release date to the anticipated publication date and release immediately on acceptance. The hold is set per BioProject and propagates to all associated BioSamples and runs. NCBI documents no maximum hold period, but our hold must not extend past publication or the end of the performance period, whichever comes first, per NIH policy.<sup>[26](#ref26),[1](#ref1)</sup>

**Kenyan-origin material and its derived sequence data carry access obligations.** Kenya's Legal Notice 68 of 2025 applies to any digital sequence information relating to Kenyan biological resources. Before generating or depositing sequence from material originating outside the United States, the requirements in the [International Research Partnership Policy](/international-partnership/) must be satisfied, country of origin must be recorded in the submission metadata, and any access-derived restriction must be disclosed in the relevant sponsor plan. NIH's 300-word limitations element and NSF's DMSP exception justification are the correct places for that disclosure.<sup>[3](#ref3),[11](#ref11),[48](#ref48)</sup>

## Code and Computational Reproducibility

Analyses are written as **R Markdown or Quarto documents executed through knitr**. Quarto renders most existing `.Rmd` files without modification.<sup>[37](#ref37)</sup>

**Everything that produces a result goes in git**: R scripts, R Markdown and Quarto documents, HiPerGator job and SLURM submission scripts, Opentrons protocol files, and the environment lockfile. Push to the laboratory GitHub organisation rather than keeping the repository under a personal account. Commit incrementally rather than in a single commit at the end of a project.

**`renv` is mandatory per project.** Run `renv::init()` at project creation, `renv::snapshot()` before every release or manuscript submission, and commit `renv.lock` to version control.<sup>[36](#ref36)</sup>

Practices adopted directly from the reproducibility literature: record how every result was produced; avoid manual data manipulation; archive the exact versions of all software used; version-control all scripts; record random seeds; store the data underlying every plot; preserve raw data untouched and document all processing; keep code modular; and use a systematic project layout.<sup>[31](#ref31),[32](#ref32)</sup>

**Every repository carries a LICENSE file** before archiving. Default recommendations are MIT for permissive reuse and GPLv3 where share-alike is wanted.<sup>[33](#ref33),[35](#ref35)</sup>

**Code is archived at publication with a DOI.** Enable the repository in Zenodo, then cut a GitHub release; Zenodo issues a new DOI for each release. Two hard constraints: **Zenodo can only access public repositories**, and **no release means no DOI**. Organization-owned repositories may require owner approval of Zenodo's OAuth grant.<sup>[33](#ref33),[34](#ref34)</sup>

Because NSF's research misconduct definition now explicitly encompasses AI-based tools, **AI-assisted code and analysis must be disclosed** consistent with the [Artificial Intelligence Use Policy](/ai-policy/).<sup>[11](#ref11)</sup>

## Storage on HiPerGator

**Nothing on HiPerGator is backed up by default.** UF Research Computing states this plainly: the storage systems are not backed up by default, and users are responsible for purchasing backup services or setting up their own backups.<sup>[38](#ref38),[39](#ref39),[41](#ref41)</sup>

* `/home` provides **40 GB** per user, for source code, scripts, and project documents. It **must not be used for job input or output**. The only recovery available without purchase is snapshots at `~/.snapshot/`: **daily for one week plus weekly for three additional weeks**.<sup>[38](#ref38),[39](#ref39)</sup>
* `/blue` is the primary location for all files read or written during job execution, and requires an active compute allocation.<sup>[38](#ref38),[39](#ref39)</sup>
* `/orange` is the archival tier and **requires an active `/blue` allocation**. This means that losing a compute allocation cascades into losing archival storage eligibility. **Project close triggers a mandatory off-HiPerGator egress review.**<sup>[38](#ref38)</sup>
* `/red` data is **removed 24 hours after allocation expiration**, and local scratch is destroyed at job end and is irretrievably lost. Neither is ever a data-of-record location.<sup>[38](#ref38),[39](#ref39)</sup>
* Backup on `/blue` and `/orange` can be purchased through UF Tivoli; current pricing and version-retention terms are on the UF Research Computing page.<sup>[40](#ref40)</sup>

**SRA and EDI deposition are the only copies in this stack not subject to the storage limits above.** Deposition therefore happens at sequencing time rather than at publication.<sup>[24](#ref24),[30](#ref30),[38](#ref38)</sup>

UF holds an enterprise **LabArchives** licence, which is the sanctioned electronic laboratory notebook and keeps notebook custody with the University.<sup>[46](#ref46)</sup>

## Retention

The laboratory retains records for the **longest applicable** of the following.

* **Three years** from submission of the final financial report for all federally funded research records under 2 CFR 200.334, extended automatically while any litigation, claim, or audit finding is open. Under NIH terms the clock runs from the annual Federal Financial Report.<sup>[42](#ref42),[8](#ref8)</sup>
* **Five fiscal years** after completion or termination of the project, per the UF records schedule for federal project files and grant files. **This, not the federal three years, is the binding floor at UF.**<sup>[43](#ref43)</sup>
* **Life of the patent** for original laboratory data supporting any UF patent.<sup>[43](#ref43),[44](#ref44)</sup>
* **Ten anniversary years** for clinical study records, where applicable.<sup>[43](#ref43)</sup>
* **Seven years** for research misconduct inquiry and investigation files, held by the UF Research Integrity Officer. A misconduct allegation gives UF authority to access and take custody of records in any location, physical or electronic, so a preserve-and-hold obligation attaches immediately on notice of an allegation.<sup>[45](#ref45)</sup>

**Working rule:** retain raw sequence data, instrument-level outputs, and analysis code for the longest of five fiscal years after project close, the life of any patent, ten anniversary years for clinical study records, or seven years from the **close** of any misconduct proceeding. Nothing is deleted while a claim, audit, or proceeding is open.

## Custody When a Member Leaves

UF policy provides that personnel who leave the University "may be permitted to copy their laboratory notebooks and records and other research data and take the copies with them," but "the original notebooks and other research data will remain at the University," and confidentiality obligations survive departure.<sup>[44](#ref44),[43](#ref43)</sup>

A **Records Disposition Request** documenting who takes custodianship of the records and data is filed on departure.<sup>[43](#ref43)</sup>

Before any account is deprovisioned, the departing member receives a complete copy of their notebooks, data, code, and analysis records, and confirms receipt in writing. Access is restored on request to any former member who is a co-author on a live or published manuscript.

Offboarding checklist:

1. All data of record deposited to SRA or EDI under a **laboratory-owned account, not a personal one**; code archived to Zenodo with a DOI. `/orange` is a working copy only and is never an acceptable sole location, for the allocation-cascade reason above.
2. All GitHub repositories transferred to the laboratory organization before the individual's account is deprovisioned.
3. `renv.lock` and rendered outputs committed; final `renv::snapshot()` run.
4. BioProject, BioSample, and SRA submissions reconciled and release dates confirmed.
5. NSF-PAR and PubMed Central deposits reconciled; ORCID updated.
6. LabArchives notebooks transferred to the laboratory account.

## Review

This policy is reviewed annually and immediately upon any change to NIH or NSF data management, public access, or plan format requirements, or to UF Research Computing storage terms.

---

### Policy Acknowledgment

*Please print and sign if hard copy is required, or confirm via email.*

**Member Name (print):** ___________________________________

**Member Signature:** ___________________________________  
**Date:** __________________

**Principal Investigator Signature:** ___________________________________  
**Date:** __________________

**Member Acknowledgment:** All laboratory members must read and acknowledge this policy upon joining the laboratory and annually thereafter.

---

### References

<ol>
<li id="ref1">National Institutes of Health. <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-21-013.html">Final NIH Policy for Data Management and Sharing (NOT-OD-21-013)</a>. Released 29 October 2020; effective 25 January 2023.</li>
<li id="ref2">National Institutes of Health. <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-21-014.html">Supplemental Information to the NIH Policy for Data Management and Sharing: Elements of an NIH Data Management and Sharing Plan (NOT-OD-21-014)</a>. 2020. Superseded for applications due on or after 25 May 2026.</li>
<li id="ref3">National Institutes of Health. <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-26-046.html">Updated Elements of an NIH Data Management and Sharing Plan (NOT-OD-26-046)</a>. Released 25 February 2026; applies to applications submitted on or after 25 May 2026.</li>
<li id="ref4">NIH Office of Extramural Research. <a href="https://grants.nih.gov/news-events/nih-extramural-nexus-news/2026/04/2026-pilot-data-management-and-sharing-plan-format-available">2026 Pilot Data Management and Sharing Plan Format Available</a>. NIH Extramural Nexus, 29 April 2026.</li>
<li id="ref5">National Institutes of Health. <a href="https://grants.nih.gov/grants-process/write-application/forms-directory/data-management-and-sharing-plan-format-page">Data Management and Sharing Plan Format Page</a>. Last updated 15 April 2026.</li>
<li id="ref6">National Institutes of Health. <a href="https://grants.nih.gov/policy-and-compliance/policy-topics/sharing-policies/dms">Data Management and Sharing Policy</a>.</li>
<li id="ref7">National Institutes of Health. <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-047.html">2024 NIH Public Access Policy (NOT-OD-25-047)</a>. Released 17 December 2024; effective 31 December 2025.</li>
<li id="ref8">National Institutes of Health. <a href="https://grants.nih.gov/grants/policy/nihgps/HTML5/section_8/8.4.2_record_retention_and_access.htm">NIH Grants Policy Statement, Section 8.4.2: Record Retention and Access</a>. Revised March 2026.</li>
<li id="ref9">National Institutes of Health. <a href="https://grants.nih.gov/policy-and-compliance/policy-topics/sharing-policies/gds">Genomic Data Sharing Policy</a>.</li>
<li id="ref10">U.S. National Science Foundation. <a href="https://www.nsf.gov/policies/pappg/24-1">Proposal and Award Policies and Procedures Guide, NSF 24-1</a>. Effective 20 May 2024. See Chapter II.D.2.i(ii).</li>
<li id="ref11">U.S. National Science Foundation. <a href="https://www.nsf.gov/policies/document/pappg24-1-supplement-1">Policy Notice: Implementation of Policy Changes to PAPPG 24-1, Supplement 1 (NSF 26-200)</a>. Effective 8 December 2025.</li>
<li id="ref12">U.S. National Science Foundation. <a href="https://www.nsf.gov/policies/document/pappg24-1-supplement-2">Policy Notice: Implementation of Policy Changes to PAPPG 24-1, Supplement 2 (NSF 26-202)</a>. Effective 22 January 2026.</li>
<li id="ref13">U.S. National Science Foundation, Directorate for Biological Sciences. <a href="https://www.nsf.gov/bio/data-management-plans">NSF BIO Data Management and Sharing Plan Guidance</a>. Last updated 26 June 2026.</li>
<li id="ref14">U.S. National Science Foundation. <a href="https://www.nsf.gov/policies/pappg/24-1/ch-11-other-post-award-requirements">PAPPG 24-1, Chapter XI.D.4: Dissemination and Sharing of Research Results</a>.</li>
<li id="ref15">U.S. National Science Foundation. <a href="https://www.nsf.gov/public-access">NSF Public Access Initiative</a>. Last updated 18 September 2025.</li>
<li id="ref16">Wilkinson MD, Dumontier M, Aalbersberg IJ, Appleton G, Axton M, Baak A, Blomberg N, Boiten JW, Bonino da Silva Santos L, Bourne PE, et al. <a href="https://doi.org/10.1038/sdata.2016.18">The FAIR Guiding Principles for scientific data management and stewardship</a>. <em>Scientific Data</em>. 2016;3:160018.</li>
<li id="ref17">Yilmaz P, Kottmann R, Field D, Knight R, Cole JR, Amaral-Zettler L, Gilbert JA, Karsch-Mizrachi I, Johnston A, Cochrane G, et al. <a href="https://doi.org/10.1038/nbt.1823">Minimum information about a marker gene sequence (MIMARKS) and minimum information about any (x) sequence (MIxS) specifications</a>. <em>Nature Biotechnology</em>. 2011;29(5):415-420.</li>
<li id="ref18">Genomic Standards Consortium. <a href="https://genomicsstandardsconsortium.github.io/mixs/">MIxS: Minimum Information about any (x) Sequence</a>. Current release v6.3.1, 14 July 2026. Persistent URI: https://w3id.org/mixs</li>
<li id="ref19">Genomic Standards Consortium. <a href="https://www.gensc.org/pages/standards-intro.html">Standards</a>.</li>
<li id="ref20">Kim L, Lavrinienko A, Sebechlebska Z, Stoltenberg S, Bokulich NA. <a href="https://doi.org/10.1093/nar/gkaf777">Tier-based standards for FAIR sequence data and metadata sharing in microbiome research</a>. <em>Nucleic Acids Research</em>. 2025;53(15):gkaf777.</li>
<li id="ref21">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/bioproject/docs/faq/">BioProject Frequently Asked Questions</a>. Last updated 1 April 2025.</li>
<li id="ref22">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/biosample/docs/">BioSample Documentation</a>.</li>
<li id="ref23">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/biosample/docs/packages/">BioSample Packages</a>.</li>
<li id="ref24">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/sra/docs/submit/">SRA Submission Quick Start</a>. Last updated 26 June 2026.</li>
<li id="ref25">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/sra/docs/submitmeta/">SRA Metadata and Submission Overview</a>.</li>
<li id="ref26">National Center for Biotechnology Information. <a href="https://www.ncbi.nlm.nih.gov/sra/docs/submitsra/">Change release date of SRA data and associated Project and Samples</a>.</li>
<li id="ref27">Darwin Core Task Group. <a href="https://www.tdwg.org/standards/dwc/">Darwin Core</a>. Biodiversity Information Standards (TDWG), ratified 9 October 2009.</li>
<li id="ref28">Wieczorek J, Bloom D, Guralnick R, Blum S, D&ouml;ring M, Giovanni R, Robertson T, Vieglais D. <a href="https://doi.org/10.1371/journal.pone.0029715">Darwin Core: An Evolving Community-Developed Biodiversity Data Standard</a>. <em>PLOS ONE</em>. 2012;7(1):e29715.</li>
<li id="ref29">Jones MB, O'Brien M, Mecum B, Boettiger C, Schildhauer M, Maier M, Whiteaker T, Earl S, Chong S. <a href="https://eml.ecoinformatics.org/">Ecological Metadata Language version 2.2.0</a>. KNB Data Repository, 2019. DOI: 10.5063/F11834T2.</li>
<li id="ref30">Environmental Data Initiative. <a href="https://edirepository.org/about/edi-policy">EDI Policy</a>. NSF Awards 2223103 and 2223104.</li>
<li id="ref31">Sandve GK, Nekrutenko A, Taylor J, Hovig E. <a href="https://doi.org/10.1371/journal.pcbi.1003285">Ten Simple Rules for Reproducible Computational Research</a>. <em>PLOS Computational Biology</em>. 2013;9(10):e1003285.</li>
<li id="ref32">Wilson G, Bryan J, Cranston K, Kitzes J, Nederbragt L, Teal TK. <a href="https://doi.org/10.1371/journal.pcbi.1005510">Good enough practices in scientific computing</a>. <em>PLOS Computational Biology</em>. 2017;13(6):e1005510.</li>
<li id="ref33">GitHub, Inc. <a href="https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content">Referencing and citing content</a>. GitHub Docs.</li>
<li id="ref34">Zenodo (CERN and OpenAIRE). <a href="https://help.zenodo.org/docs/github/archive-software/github-upload/">Archive a release from GitHub</a>.</li>
<li id="ref35">GitHub, Inc. <a href="https://choosealicense.com/">Choose an open source license</a>.</li>
<li id="ref36">Ushey K, Wickham H. <a href="https://rstudio.github.io/renv/">renv: Project Environments</a>. R package version 1.2.3. Posit.</li>
<li id="ref37">Posit. <a href="https://quarto.org/docs/computations/r.html">Quarto: Using R</a>.</li>
<li id="ref38">UFIT Research Computing. <a href="https://www.rc.ufl.edu/documentation/policies/storage/">HiPerGator Usage Policies: Storage</a>. University of Florida.</li>
<li id="ref39">UFIT Research Computing. <a href="https://docs.rc.ufl.edu/quickstart/practical_storage/">Practical Storage Use</a>. University of Florida.</li>
<li id="ref40">UFIT Research Computing. <a href="https://docs.rc.ufl.edu/services/tivoli_backup/">Tivoli Backup</a>. University of Florida.</li>
<li id="ref41">UFIT Research Computing. <a href="https://docs.rc.ufl.edu/">UFIT Research Computing User Documentation</a>. University of Florida.</li>
<li id="ref42">Office of Management and Budget. <a href="https://www.ecfr.gov/current/title-2/subtitle-A/chapter-II/part-200/subpart-D/subject-group-ECFR4acc10e7e3b676f/section-200.334">2 CFR 200.334: Record retention requirements</a>. eCFR, last amended 16 July 2026.</li>
<li id="ref43">University of Florida, George A. Smathers Libraries. <a href="https://records.uflib.ufl.edu/record-retention/research-records-data/">Research Records and Data</a>. Records Management at UF. See GS1-SL Items 137 and 422 and GS4 Item 137.</li>
<li id="ref44">University of Florida. <a href="https://policy.ufl.edu/policy/intellectual-property/">Intellectual Property Policy (Policy 14-006)</a>. See Section C.2.</li>
<li id="ref45">University of Florida. <a href="https://policy.ufl.edu/policy/research-integrity/">UF Research Integrity Policy (Policy 14-004)</a>. Substantively amended 24 March 2026.</li>
<li id="ref46">University of Florida, George A. Smathers Libraries. <a href="https://guides.uflib.ufl.edu/datamanagement">Research Data Management at UF</a>. Last updated 20 May 2026.</li>
<li id="ref47">National Institutes of Health. <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-101.html">Revision: Notice of Updated Effective Date for the 2024 NIH Public Access Policy (NOT-OD-25-101)</a>. Moved the effective date to 1 July 2025.</li>
<li id="ref48">Republic of Kenya. <a href="https://new.kenyalaw.org/akn/ke/act/ln/2025/68/eng@2025-03-24">The Environmental Management and Co-ordination (Access to Biological Resources and Benefit Sharing) (No. 2) Regulations, 2025</a>. Legal Notice No. 68 of 2025. See regulations 4(1)(e) and 11.</li>
</ol>
