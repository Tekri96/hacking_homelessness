# Contributing to Calgary Cares

First off, thank you for considering contributing to Calgary Cares. It's people like you that make Calgary Cares such a great tool for tackling homelessness in our community.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/Tekri96/hacking_homelessness/issues) page to see if someone else in the community has already created a ticket. If not, go ahead and [make one](https://github.com/Tekri96/hacking_homelessness/issues/new)!

## Fork & create a branch

If this is something you think you can fix, then [fork Calgary Cares](https://github.com/Tekri96/hacking_homelessness/fork) and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

git checkout -b 325-add-japanese-localization

## Get the test suite running

Make sure you're using a recent version of Node.js and npm. Then, run:

```bash
npm install
npm run test

Implement your fix or feature
At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.
Get the style right
Your patch should follow the same coding conventions & pass the same code quality checks as the rest of the project. Run npm run lint to check your code style.
Make a Pull Request
At this point, you should switch back to your master branch and make sure it's up to date with Calgary Cares's master branch:
git remote add upstream git@github.com:Tekri96/hacking_homelessness.git
git checkout master
git pull upstream master

git checkout 325-add-japanese-localization
git rebase master
git push --set-upstream origin 325-add-japanese-localization

Finally, go to GitHub and make a Pull Request :D
Keeping your Pull Request updated
If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.
To learn more about rebasing in Git, there are a lot of good resources but here's the suggested workflow:

git checkout 325-add-japanese-localization
git pull --rebase upstream master
git push --force-with-lease 325-add-japanese-localization

Code review
I will review your pull request and provide feedback. Please be patient as this process can take some time.
What happens next?
I will review your pull request and either merge it, request changes, or close it with an explanation.
