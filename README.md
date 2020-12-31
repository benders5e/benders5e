# Benders 5e

A homebrew _Avatar: The Last Airbender_-inspired D&D 5e campaign setting. Visit [the old repo's wiki](https://github.com/nglaeser/benders/wiki) for a comparison of this setting to other ATLA-inspired settings and other notes.

Site layout influenced by the [Mass Effect 5e site](http://n7.world) (the code for which is open-sourced on GitHub [here](https://github.com/queryluke/masseffect-5e)).

### Branches
`master`: site  
`class-drafts`: incremental homebrew updates  
`bootstrap`: work in progress adding bootstrap to the project

### Dependencies
- Jekyll (theme: minima)
- Bootstrap (I'm using v5.0.0-beta1)
    - Download the **source files** [here](https://getbootstrap.com/docs/5.0/getting-started/download/)
    ```
    mkdir _sass/bootstrap
    cp ~/Downloads/bootstrap-5.0.0-beta1/scss/ _sass/bootstrap
    ```
    - overwrite `_sass/bootstrap/bootstrap.scss` with the file of the same name in this repo
    - Link the JS (if you're using this repo's `_includes/footer.html`, it's already taken care of)
    ```
    # add this line at the end of the <body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    ```