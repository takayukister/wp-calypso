# Tutorial: Building a Simple Tour

In this tutorial, we'll create a brief tour that shows a user how the site preview works. 

It's not a comprehensive tutorial, but walks you through many of the different tasks that you'll encounter when developing a tour using Guided Tours. 

For more complete technical information, please see the existing tours (linked to [in the README.md](../README.md)), the [API documentation](./docs/API.md), and the [architecture documentation](./ARCHITECTURE.md). 

## What Do We Want To Achieve? 

Before we think about what steps we want our tour to have, we should take a step back and think about what goals we want to achieve with our tour. 

In this case, we might want to make sure new users understand where the site preview is and how it works. 

In addition, it will be useful to have thought about how we want to measure reaching this goal. Here, we would hope that with our tour active, we would soon see an increase the usage of the site preview by new users. 

## Decide for Tour Steps

With that in mind, we can come up with the following steps:

1. Ask the user whether they want to learn how to preview their site. 
2. Point to the site preview and tell the user to click their site's title so that the preview opens. 
3. When the preview is showing, explain that this is the site preview. 
4. Show the user how to exit the preview and wait for them to do it. 
5. Finish the tour. 

We could have included a step — or even multiple steps — to explain the different device sizes, but it's advisable to start off with tours that are as short as possible to see how they perform. We can always come back and add additional steps. 

## Decide for Triggers

To start the tour, we need to provide a list of paths and a trigger function. 

We want our tour to start when the user is looking at their stats. We therefore use `[ '/stats' ]` as the path. Note that in the tour implementation, we can provide a single path as just a string as opposed to an array. 

We only want our tour to show for users who have registered in the past 7 days. We express that by ...

Also: a/b test. 

- decide for tour steps: what do you want to achieve? 
- make <Tour>
- add <Steps> with text and default positioning
- add an abtest and add the abtest selector as the last when condition
- to analyze the results later, you should also figure out what action you want users to do more of. this is beyond the scope of this document, however.

## 

abtest as last selector in trigger condition

we should keep track of the tour
there are tracks events for staring, quitting, and finishing tours

custom styles:

https://github.com/Automattic/wp-calypso/blob/2846567096f164c1426b223887039f79808ae612/client/layout/guided-tours/tours/theme-sheet-welcome-tour.js#L121

```JSX
<Step
	...
	style={ { marginTop: '-15px', zIndex: 1 } }
>
```

animation delay: 

https://github.com/Automattic/wp-calypso/pull/10116/files

```JSX
style={ {
	animationDelay: '10s',
	marginTop: '-8px',
	zIndex: '100000',
} }
```


translation
how to do the calls and when to add them (when copy has been reworked, also maybe after `en` a/b test)

formatting with {{strong}} etc., adding GridIcons, ...

