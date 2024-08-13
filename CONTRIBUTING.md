# How to contribute

The college quizbowl calendar is a community-updated resource. It is not intended for a single person to update it each week, year after year.

## What does an update to the calendar involve?

At its core, updating the calendar almost entirely just means adding info to [YAML](https://learnxinyminutes.com/docs/yaml/) files (structured plain text files). An example update looks basically [like this](https://github.com/quizbowl/collegecalendar/commit/34eaa5f0d).

When | Task
-|-
Before the start of a season | Add `season.yaml` and placeholder YAML files for each expected tournament slot
After a new set is announced | Add a YAML file for the new set
After a new mirror is announced | Add it to the set’s YAML file
As other information is announced | Update above files

Minor updates are easy: find the relevant YAML file inside this GitHub repository and [edit it directly](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files#editing-files-in-another-users-repository). GitHub takes care of filing the pull request automatically.

For major updates, it is encouraged to set up a development environment so that you can test changes locally on your computer. There is a one-time overhead of setting up Jekyll (the static site generator), Git (version control system), and GitHub (to communicate changes with the community via pull requests) if you haven’t done so before, in addition to a learning curve for each tool. Reach out for help getting started.

## Why use GitHub PRs? Doesn't that make it harder to contribute?

The college quizbowl calendar is primarily a website (that is backed by structured data stored in plain text) and not in itself merely a database of information.

While an interactive interface triggered by a big "edit this website" button is not completely out of scope, it would be a significant amount of work, a user account system, active moderation, dynamic web hosting, and maintenance.

GitHub comes free with an existing account system, solutions for moderation and collaboration (despite a learning curve), hosting and deployment, notifications, and maintenance. Git of course provides versioning, and its distributed/pull request model allows people to work independently, although does not inherently structure coordination between people. GitHub’s convenient edit button also enables minor contributions without requiring full-fledged PRs.
Anyone coding seriously these days knows that over the last 15 years, GitHub has become standard practice for open-source tech collaboration by far and the pull request flow is a key part of coding literacy.

On the other hand, many people have no idea how to contribute, are not comfortable with Git, GitHub, or setting up dependencies like Jekyll, or are not willing to learn, team up with others, or ask for help.

So there is a trade-off. Expecting that not many people are going to bother to contribute either way, it is difficult to justify the effort of a bespoke implementation of everything mentioned above.

## Contribution process guidelines

Non-trivial pull requests should be left open for at least 48 hours to allow for review. Please don’t forget to test your changes locally. Don’t blindly push upstream if you’re a contributor with commit permissions. Keep the code clean and the commit graph sane.
