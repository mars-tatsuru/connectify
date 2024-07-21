<script setup lang="ts">
  import {
    VueFlow,
    useVueFlow,
    MarkerType,
    getBezierPath,
  } from "@vue-flow/core";
  import { Background } from "@vue-flow/background";
  import { ControlButton, Controls } from "@vue-flow/controls";
  import { MiniMap } from "@vue-flow/minimap";

  // use vue flow original components
  const {
    onInit,
    onNodeDragStop,
    onConnect,
    addEdges,
    setViewport,
    toObject,
    getConnectedEdges,
    getIncomers,
    getOutgoers,
    getIntersectingNodes,
  } = useVueFlow();

  // node info
  const nodes = ref([
    {
      id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 250, y: 0 },
      class: "light",
    },
    {
      id: "2",
      type: "output",
      data: { label: "Node 2" },
      position: { x: 100, y: 100 },
      class: "light",
    },
    {
      id: "3",
      data: { label: "Node 3" },
      position: { x: 400, y: 100 },
      class: "light",
    },
    {
      id: "4",
      data: { label: "Node 4" },
      position: { x: 150, y: 200 },
      class: "light",
    },
    {
      id: "5",
      type: "output",
      data: { label: "Node 5" },
      position: { x: 300, y: 300 },
      class: "light",
    },
  ]);

  // edge info
  const edges = ref([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      label: "edge with arrowhead",
      markerEnd: MarkerType.ArrowClosed,
    },
    {
      id: "e4-5",
      type: "step",
      source: "4",
      target: "5",
      label: "Node 2",
      style: { stroke: "orange" },
      labelBgStyle: { fill: "orange" },
    },
    {
      id: "e3-4",
      type: "smoothstep",
      source: "3",
      target: "4",
      label: "smoothstep-edge",
    },
  ]);

  // our dark mode toggle flag
  const dark = ref(false);

  // init
  onInit((vueFlowInstance) => {
    // instance is the same as the return of `useVueFlow`
    vueFlowInstance.fitView();
    const connectedEdge = getConnectedEdges("1");
    const incomers = getIncomers("2");
    const outgoers = getOutgoers("3");
    console.log("Connected Edges", connectedEdge);
    console.log("Incomers", incomers);
    console.log("Outgoers", outgoers);
  });

  // call below function when dragged node is stopped
  onNodeDragStop(({ event, nodes, node }) => {
    console.log("Node Drag Stop", { event, nodes, node });
  });

  // onConnect is called when a new connection is created.
  onConnect((connection) => {
    addEdges(connection);
  });

  function updatePos() {
    nodes.value = nodes.value.map((node) => {
      return {
        ...node,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
      };
    });
  }

  // toObject transforms your current graph data to an easily persist-able object
  function logToObject() {
    console.log(toObject());
  }

  //  Resets the current viewport transformation (zoom & pan)
  function resetTransform() {
    setViewport({ x: 0, y: 0, zoom: 1 });
  }

  function toggleDarkMode() {
    dark.value = !dark.value;
  }
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :class="{ dark }"
    class="basic-flow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background pattern-color="#aaa" :gap="16" />

    <MiniMap />

    <Controls position="top-left">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <!-- <Icon name="reset" /> -->
        R
      </ControlButton>

      <ControlButton title="Shuffle Node Positions" @click="updatePos">
        UP
      </ControlButton>

      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <!-- <Icon v-if="dark" name="sun" /> -->
        <!-- <Icon v-else name="moon" /> -->
        <span v-if="dark">sun</span>
        <span v-else="dark">moon</span>
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        log
      </ControlButton>
    </Controls>
  </VueFlow>
</template>

<style>
  @import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.39.0/dist/style.css";
  @import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.39.0/dist/theme-default.css";
  @import "https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css";
  @import "https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css";
  @import "https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css";

  html,
  body,
  #app {
    margin: 0;
    height: 100%;
  }

  #app {
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .vue-flow {
    width: 100%;
    height: 100vh;
  }

  .vue-flow__minimap {
    transform: scale(75%);
    transform-origin: bottom right;
  }

  .basic-flow.dark {
    background: #2d3748;
    color: #fffffb;
  }

  .basic-flow.dark .vue-flow__node {
    background: #4a5568;
    color: #fffffb;
  }

  .basic-flow.dark .vue-flow__node.selected {
    background: #333;
    box-shadow: 0 0 0 2px #2563eb;
  }

  .basic-flow .vue-flow__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .basic-flow.dark .vue-flow__controls {
    border: 1px solid #fffffb;
  }

  .basic-flow .vue-flow__controls .vue-flow__controls-button {
    border: none;
    border-right: 1px solid #eee;
  }

  .basic-flow .vue-flow__controls .vue-flow__controls-button svg {
    height: 100%;
    width: 100%;
  }

  .basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
    background: #333;
    fill: #fffffb;
    border: none;
  }

  .basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
    background: #4d4d4d;
  }

  .basic-flow.dark .vue-flow__edge-textbg {
    fill: #292524;
  }

  .basic-flow.dark .vue-flow__edge-text {
    fill: #fffffb;
  }
</style>
