import { c as createCommonjsModule } from '../../../common/_commonjsHelpers-c0e5a12b.js';
import { a0 as __spreadArrays, _ as __assign, a as __rest, K as mergeDeep, s as shouldInclude, F as hasDirectives, W as hasClientExports, a1 as getDirectiveNames, a2 as getInclusionDirectives, w as createFragmentMap, k as getFragmentQueryDocument, B as getFragmentFromSelection, a3 as checkDocument, g as getOperationDefinition, U as getOperationName, x as getFragmentDefinitions, t as getQueryDefinition, a4 as getFragmentDefinition, u as getMainDefinition, q as getDefaultValues, n as makeReference, l as isReference, m as isField, R as isInlineFragment, a5 as valueToObjectRepresentation, H as storeKeyNameFromField, G as argumentsObjectFromField, r as resultKeyNameFromField, J as getStoreKeyName, E as getTypenameFromResult, y as addTypenameToDocument, Q as buildQueryFromSelectionSet, a6 as removeDirectivesFromDocument, V as removeConnectionDirectiveFromDocument, a7 as removeArgumentsFromDocument, a8 as removeFragmentSpreadFromDocument, O as removeClientSetsFromDocument, z as zenObservable, C as mergeDeepArray, D as DeepMerger, h as cloneDeep, o as maybeDeepFreeze, f as iterateObserversSafely, Z as asyncMap, X as Concast, j as fixObservableSubclass, c as isNonEmptyArray, S as graphQLResultHasError, p as canUseWeakMap, d as compact, A as ApolloLink, Y as execute, a9 as tslib_es6 } from '../../../common/execute-c53201b5.js';
import '../../../common/_polyfill-node:global-acbc543a.js';

function concatPagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        merge: function (existing, incoming) {
            return existing ? __spreadArrays(existing, incoming) : incoming;
        },
    };
}
function offsetLimitPagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        merge: function (existing, incoming, _a) {
            var args = _a.args;
            var merged = existing ? existing.slice(0) : [];
            if (args) {
                var _b = args.offset, offset = _b === void 0 ? 0 : _b;
                for (var i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                }
            }
            else {
                merged.push.apply(merged, incoming);
            }
            return merged;
        },
    };
}
function relayStylePagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        read: function (existing, _a) {
            var canRead = _a.canRead, readField = _a.readField;
            if (!existing)
                return;
            var edges = [];
            var firstEdgeCursor = "";
            var lastEdgeCursor = "";
            existing.edges.forEach(function (edge) {
                if (canRead(readField("node", edge))) {
                    edges.push(edge);
                    if (edge.cursor) {
                        firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
                        lastEdgeCursor = edge.cursor || lastEdgeCursor;
                    }
                }
            });
            var _b = existing.pageInfo || {}, startCursor = _b.startCursor, endCursor = _b.endCursor;
            return __assign(__assign({}, getExtras(existing)), { edges: edges, pageInfo: __assign(__assign({}, existing.pageInfo), { startCursor: startCursor || firstEdgeCursor, endCursor: endCursor || lastEdgeCursor }) });
        },
        merge: function (existing, incoming, _a) {
            if (existing === void 0) { existing = makeEmptyData(); }
            var args = _a.args, isReference = _a.isReference, readField = _a.readField;
            var incomingEdges = incoming.edges ? incoming.edges.map(function (edge) {
                if (isReference(edge = __assign({}, edge))) {
                    edge.cursor = readField("cursor", edge);
                }
                return edge;
            }) : [];
            if (incoming.pageInfo) {
                var pageInfo_1 = incoming.pageInfo;
                var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
                var firstEdge = incomingEdges[0];
                var lastEdge = incomingEdges[incomingEdges.length - 1];
                if (firstEdge && startCursor) {
                    firstEdge.cursor = startCursor;
                }
                if (lastEdge && endCursor) {
                    lastEdge.cursor = endCursor;
                }
                var firstCursor = firstEdge && firstEdge.cursor;
                if (firstCursor && !startCursor) {
                    incoming = mergeDeep(incoming, {
                        pageInfo: {
                            startCursor: firstCursor,
                        },
                    });
                }
                var lastCursor = lastEdge && lastEdge.cursor;
                if (lastCursor && !endCursor) {
                    incoming = mergeDeep(incoming, {
                        pageInfo: {
                            endCursor: lastCursor,
                        },
                    });
                }
            }
            var prefix = existing.edges;
            var suffix = [];
            if (args && args.after) {
                var index = prefix.findIndex(function (edge) { return edge.cursor === args.after; });
                if (index >= 0) {
                    prefix = prefix.slice(0, index + 1);
                }
            }
            else if (args && args.before) {
                var index = prefix.findIndex(function (edge) { return edge.cursor === args.before; });
                suffix = index < 0 ? prefix : prefix.slice(index);
                prefix = [];
            }
            else if (incoming.edges) {
                prefix = [];
            }
            var edges = __spreadArrays(prefix, incomingEdges, suffix);
            var pageInfo = __assign(__assign({}, incoming.pageInfo), existing.pageInfo);
            if (incoming.pageInfo) {
                var _b = incoming.pageInfo, hasPreviousPage = _b.hasPreviousPage, hasNextPage = _b.hasNextPage, startCursor = _b.startCursor, endCursor = _b.endCursor, extras = __rest(_b, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
                Object.assign(pageInfo, extras);
                if (!prefix.length) {
                    if (void 0 !== hasPreviousPage)
                        pageInfo.hasPreviousPage = hasPreviousPage;
                    if (void 0 !== startCursor)
                        pageInfo.startCursor = startCursor;
                }
                if (!suffix.length) {
                    if (void 0 !== hasNextPage)
                        pageInfo.hasNextPage = hasNextPage;
                    if (void 0 !== endCursor)
                        pageInfo.endCursor = endCursor;
                }
            }
            return __assign(__assign(__assign({}, getExtras(existing)), getExtras(incoming)), { edges: edges,
                pageInfo: pageInfo });
        },
    };
}
var getExtras = function (obj) { return __rest(obj, notExtras); };
var notExtras = ["edges", "pageInfo"];
function makeEmptyData() {
    return {
        edges: [],
        pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            startCursor: "",
            endCursor: "",
        },
    };
}

var utilities = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shouldInclude: shouldInclude,
    hasDirectives: hasDirectives,
    hasClientExports: hasClientExports,
    getDirectiveNames: getDirectiveNames,
    getInclusionDirectives: getInclusionDirectives,
    createFragmentMap: createFragmentMap,
    getFragmentQueryDocument: getFragmentQueryDocument,
    getFragmentFromSelection: getFragmentFromSelection,
    checkDocument: checkDocument,
    getOperationDefinition: getOperationDefinition,
    getOperationName: getOperationName,
    getFragmentDefinitions: getFragmentDefinitions,
    getQueryDefinition: getQueryDefinition,
    getFragmentDefinition: getFragmentDefinition,
    getMainDefinition: getMainDefinition,
    getDefaultValues: getDefaultValues,
    makeReference: makeReference,
    isReference: isReference,
    isField: isField,
    isInlineFragment: isInlineFragment,
    valueToObjectRepresentation: valueToObjectRepresentation,
    storeKeyNameFromField: storeKeyNameFromField,
    argumentsObjectFromField: argumentsObjectFromField,
    resultKeyNameFromField: resultKeyNameFromField,
    getStoreKeyName: getStoreKeyName,
    getTypenameFromResult: getTypenameFromResult,
    addTypenameToDocument: addTypenameToDocument,
    buildQueryFromSelectionSet: buildQueryFromSelectionSet,
    removeDirectivesFromDocument: removeDirectivesFromDocument,
    removeConnectionDirectiveFromDocument: removeConnectionDirectiveFromDocument,
    removeArgumentsFromDocument: removeArgumentsFromDocument,
    removeFragmentSpreadFromDocument: removeFragmentSpreadFromDocument,
    removeClientSetsFromDocument: removeClientSetsFromDocument,
    concatPagination: concatPagination,
    offsetLimitPagination: offsetLimitPagination,
    relayStylePagination: relayStylePagination,
    Observable: zenObservable,
    mergeDeep: mergeDeep,
    mergeDeepArray: mergeDeepArray,
    DeepMerger: DeepMerger,
    cloneDeep: cloneDeep,
    maybeDeepFreeze: maybeDeepFreeze,
    iterateObserversSafely: iterateObserversSafely,
    asyncMap: asyncMap,
    Concast: Concast,
    fixObservableSubclass: fixObservableSubclass,
    isNonEmptyArray: isNonEmptyArray,
    graphQLResultHasError: graphQLResultHasError,
    canUseWeakMap: canUseWeakMap,
    compact: compact
});

var empty = ApolloLink.empty;

var from = ApolloLink.from;

var split = ApolloLink.split;

var concat = ApolloLink.concat;

var core = /*#__PURE__*/Object.freeze({
    __proto__: null,
    empty: empty,
    from: from,
    split: split,
    concat: concat,
    execute: execute,
    ApolloLink: ApolloLink
});

var error_cjs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });





function onError(errorHandler) {
    return new core.ApolloLink(function (operation, forward) {
        return new utilities.Observable(function (observer) {
            var sub;
            var retriedSub;
            var retriedResult;
            try {
                sub = forward(operation).subscribe({
                    next: function (result) {
                        if (result.errors) {
                            retriedResult = errorHandler({
                                graphQLErrors: result.errors,
                                response: result,
                                operation: operation,
                                forward: forward,
                            });
                            if (retriedResult) {
                                retriedSub = retriedResult.subscribe({
                                    next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer),
                                });
                                return;
                            }
                        }
                        observer.next(result);
                    },
                    error: function (networkError) {
                        retriedResult = errorHandler({
                            operation: operation,
                            networkError: networkError,
                            graphQLErrors: networkError &&
                                networkError.result &&
                                networkError.result.errors,
                            forward: forward,
                        });
                        if (retriedResult) {
                            retriedSub = retriedResult.subscribe({
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer),
                            });
                            return;
                        }
                        observer.error(networkError);
                    },
                    complete: function () {
                        if (!retriedResult) {
                            observer.complete.bind(observer)();
                        }
                    },
                });
            }
            catch (e) {
                errorHandler({ networkError: e, operation: operation, forward: forward });
                observer.error(e);
            }
            return function () {
                if (sub)
                    sub.unsubscribe();
                if (retriedSub)
                    sub.unsubscribe();
            };
        });
    });
}
var ErrorLink = (function (_super) {
    tslib_es6.__extends(ErrorLink, _super);
    function ErrorLink(errorHandler) {
        var _this = _super.call(this) || this;
        _this.link = onError(errorHandler);
        return _this;
    }
    ErrorLink.prototype.request = function (operation, forward) {
        return this.link.request(operation, forward);
    };
    return ErrorLink;
}(core.ApolloLink));

exports.ErrorLink = ErrorLink;
exports.onError = onError;

});

var onError = error_cjs.onError;
export { onError };
