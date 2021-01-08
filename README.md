# Benders 5e

A homebrew _Avatar: The Last Airbender_-inspired D&D 5e campaign setting. Visit [the old repo's wiki](https://github.com/nglaeser/benders/wiki) for a comparison of this setting to other ATLA-inspired settings and other notes.

Site layout influenced by the [Mass Effect 5e site](http://n7.world) (the code for which is open-sourced on GitHub [here](https://github.com/queryluke/masseffect-5e)).

## Branches
`master`: site  
`class-drafts`: incremental homebrew updates  
`bootstrap`: work in progress adding bootstrap to the project

## Contributing

Please read the [contributing guidelines](CONTRIBUTING.md) (to be added) first. If you have feature suggestions or requests, open an issue so that they can be discussed. Be sure to check if a similar issue already exists before opening a new one. All pull requests should point to a corresponding issue.

## Technical Stuff

### Dependencies
- Jekyll (theme: minima)
- Bootstrap (I'm using `v5.0.0-beta1`)
    - Download the source files [here](https://getbootstrap.com/docs/5.0/getting-started/download/). Then
    ```
    mkdir _sass/bootstrap
    cp ~/Downloads/bootstrap-5.0.0-beta1/scss/ _sass/bootstrap
    ```
    - replace `_sass/bootstrap/bootstrap.scss` with the file of the same name in this repo
    - Link the JS ***only if you are not already using this repo's `_includes/footer.html`***:
    ```
    # add this line at the end of the <body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    ```

### Analytics

This project uses [GoatCounter](https://www.goatcounter.com/) for analytics. As much as I would prefer not to track anyone at all, I do need to get a sense of whether people are visiting this site and *roughly* where they are from. I chose GoatCounter because I wanted a privacy-focused, open-source, and relatively inexpensive (this is a personal project, after all) alternative to the extremely invasive and unfortunately also pervasive Google Analytics. GoatCounter counter meets these criteria and does not track users with unique identifiers. Read more about GoatCounter's goals [here](https://www.goatcounter.com/why#what-are-goatcounters-goals).