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
    - overwire `_sass/bootstrap/bootstrap.scss` with the file of the same name in this repo