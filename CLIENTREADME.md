universal-static-instagram
===============

# Client Architecture

## Redux

This project uses `redux` which allows it to keep the state in a single tree. See the section at the bottom for an example of what the state tree could look like.

It is manipulated from the raw Instagram JSON using `normalizr` to normalize against a specific schema for tags, pages, and photos.

During a session, the whole tree is kept in memory and never fetched again once each part has been fetched once. On its first load, each page fetches the date it needs based on its pathname. There is one generic `components/PageContainer` which handles fetching the data via a `redux` action creator on `componentDidMount` and `componentWillReceiveProps`. This `PageContainer` is rendered by components wrapped by `react-redux` `@connect` decorator which are stored in `containers/`.

On initial load for any one page, it won't fetch any data since it has already been rendered statically and the `redux` tree has been hydrated with data from the initial page load. Any subsequent page changes will only fetch that data they need and not refresh the app obviously.

Each action creator works with a custom API middleware to trigger request, success, and failure actions for each `byId` section of the state. Any successful request will populate the `entities` with the full data and `byId[PATHNAME].ids` with each entity ids that it requires. These are merged into one data object by `helpers/mapKeyToProps` which maps the specific state key (photos, tags, etc) to an object from the `redux` tree that is subscribed to the react component.

The rest of the components aren't subscribed to any `redux` state and update in the typical `react` fashion of receiving props from their parent.

## State Tree

```json
{
  "tags": {
    "entities": {
      "amaro": {
        "id": "amaro",
        "name": "Tag Name"
      },
      ...
    },
    "byId": {
      "/tags": {
        "isFetching": false,
        "error": null,
        "ids": ["amaro"]
      },
      ...
    }
  },
  "pages": {
    "entities": {
      "1": {
        "id": "1",
        "name": "Page 1"
      },
      ...
    },
    "byId": {
      "/pages": {
        "isFetching": false,
        "error": null,
        "ids": ["1"]
      },
      ...
    }
  },
  "photos": {
    "entities": {
      "2013/03/24/418955639693437548_326209": {
        "createdTime": "1364163425",
        "images": {...},
        "caption": {...},
        ...
      },
      "2013/03/16/413235437647358729_326209": {
        "createdTime": "1363481524",
        "images": {...},
        "caption": {...},
        ...
      },
      ...
    },
    "byId": {
      "/pages/1": {
        "isFetching": false,
        "error": null,
        "ids": [
          "2013/03/24/418955639693437548_326209",
          "2013/03/16/413235437647358729_326209",
          ...
        ],
        "id": "1",
        "name": "1",
        "type": "page",
        "previous": null,
        "next": "2"
      },
      "/tags/Earlybird": {
        "isFetching": false,
        "error": null,
        "ids": [
          "2013/03/24/418955639693437548_326209",
          "2013/03/16/413235437647358729_326209",
          ...
        ],
        "id": "Earlybird",
        "name": "Earlybird",
        "type": "tag",
        "previous": "Brannan",
        "next": "Gotham"
      },
      ...
    }
  }
}
```
