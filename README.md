# Benders 5e

A homebrew _Avatar: The Last Airbender_-inspired campaign setting for 5th edition Dungeons & Dragons (D&D 5e). 

Visit [the old repo's wiki](https://github.com/nglaeser/benders/wiki) (private repo) for a comparison of this setting to other ATLA-inspired settings and other notes.

[Visit the site! &rarr;](https://benders5e.com)  
[Repo wiki](https://github.com/benders5e/benders5e/wiki)

## Changelog

The changelog for the homebrew is available on the repo's wiki [here](https://github.com/benders5e/benders5e/wiki/rules-changelog).

## Analytics

This site uses [GoatCounter](https://www.goatcounter.com/) for analytics. As much as I would prefer not to track anyone at all, I do need to get a sense of whether people are visiting this site and *roughly* where they are from. I chose GoatCounter because I wanted a privacy-focused, open-source, and relatively inexpensive (this is a personal project, after all) alternative to the extremely invasive and unfortunately also pervasive Google Analytics. GoatCounter meets these criteria and does not track users with unique identifiers. Read more about GoatCounter's goals [here](https://www.goatcounter.com/why#what-are-goatcounters-goals).

## Contributing

These rules and the site are completely open-source, and we hope they’ll be a community effort! If you would like to contribute abilities, feats, backgrounds, items, or anything else, please take a look at the [contributing guidelines](CONTRIBUTING.markdown).

## Technical Stuff

### Dependencies
- **Jekyll** (theme: minima)
    - Quickstart guide [here](https://jekyllrb.com/docs/).  
    - Build and view the site locally:
    ```
    bundle exec jekyll serve
    ```
    and visit `http://localhost:4000`. You can also broadcast the site on your LAN with
    ```
    bundle exec jekyll serve --host 0.0.0.0
    ```
    and others on the LAN can access it at `http://[your IP]:4000`, where `[your IP]` is your machine's private IPv4 address (interface `en0` for me).

- **Bootstrap** (I'm using `v5.0.0-beta1`)
    - Download the source files [here](https://getbootstrap.com/docs/5.0/getting-started/download/). Then
    ```
    mkdir _sass/bootstrap
    cp ~/Downloads/bootstrap-5.0.0-beta1/scss/ _sass/bootstrap
    ```
    - replace `_sass/bootstrap/bootstrap.scss` with the file of the same name in this repo
    - Link the JS yourself ***only if you are not already using this repo's `_includes/footer.html`***:
    ```
    # add this line at the end of the <body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    ```

### Branches
`master`: site  
`class-drafts`: incremental homebrew updates  
`bootstrap`: work in progress adding bootstrap to the project  
`wip`: general work in progress, in particular ideas/rough drafts for future features

## License

This project is licensed under the [GNU General Public Licence v3.0](./LICENSE) (GPLv3). This means you can do almost anything you want with this code except close-source it.