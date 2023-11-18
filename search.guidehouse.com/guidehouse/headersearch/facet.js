window.facets = {
    "facets": [
        {
            "field": "limitfilter",
            "display": "Categories",
            "size": "7"
        },
    ],
    "customDateSettings": {
        "customDateField": "lastmodified",
        "customDateEnable": true,
        "customDateDisplayText": "Filter By Date"
    },
    "collection": [3],
    "sortBtns": [{
            "field": "date",
            "display": "Sort By Date",
            "sort":false,
            "sort1": false,
            "sortDir":"desc"
        },
        {
            "field": "relevance",
            "display": "Sort By Relevance",
            "sort":false,
            "sort1": true,
            "sortDir":"desc"
        },
        {
            "field": "mrank",
            "display": "Sort By Relevance with MRank",
            "sort":true,
            "sort1": false,
            "sortDir":"asc"
        },
    ],
    "facetFiltersOrder": [
        "colname", "contenttype", "keywords"
    ],
    "facetsFiltersDisplay": true,
    "facetFiltersType": "AND",
    "matchAny": "off",
    "pageSize": "20",
    "showAutoSuggest": true,
    "autoSuggestLimit": "5",
    "suggestSearch": true,
    "smartAutoSuggestSettings": {
        "enable": true,
        "pluginDomain": "https://search.guidehouse.com",
        "cnameAutoSuggest": "store",
        "limit": "5",
        "langForSuggest": "en"
    },
    "defaultCname": "",
    "adsDisplay": true,
    "featuredResultsCount": "3",
    "urlDisplay": false,
    "relatedQuery": false,
    "relatedQueryFields": {
        "apikey": "",
        "field": "content",
        "operator": "and",
        "limit": "5",
        "terms": "10",
        "type": "phrase",
        "col": "",
    },
    "smartFAQSettings": {
      "enabled": false,
      "count": 5,
      "loadMoreCount": 2,
      "limit": 10
    },
    "suggestSmartFAQs": {
        "enabled": false,
        "limit": 3
    },
    "trendingSearch": {
        "enabled": true,
        "cname":"trending_guidehouse",
		"limit": "5"
    },
    "topQuery": true,
    "topQueryFields": {
        "apikey": "",
        "col": "",
        "limit": "5",
    },
    "dataToBeDisplayed": {
        "1": {
            "title": "Title",
            "description": "Description"
        },
        "other": {
            "description": "Description"
        },
        "displayAll": true
    },
    "tuneTemplate": "WEB",
    "voiceSearch": true,
    "voiceSearchAPI": "",
    "debug": false,
    "defaultType": "AND",
    "apikey": "",
    "autologout": true,
    "pluginDomain": "https://search.guidehouse.com",
    "searchUrlRedirect":"/search"
};
