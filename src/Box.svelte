<script>
  export let ids, tiles, send, receive;
  let colors = {
    2: '#eee4da',
    4: '#eee1c9',
    8: '#f3b27a',
    16: '#f69664',
    32: '#f77c5f',
    64: '#f75f3b',
    128: '#edd073',
    256: '#edcc62',
    512: '#edc950',
    1024: '#edc53f',
    2048: '#edc22e'
  }

  const getStyles = (id) => {
    const val = tiles[id];
    const tc = val > 4 ? '#ffffff' : '#776e65';
    return `background-color: ${colors[val]}; color: ${tc}`
  }
</script>


<div class="box">
  {#each ids as id (id)}
    <div 
        class="tile" 
        style={getStyles(id)}
        in:receive="{{key: id}}"
        out:send="{{key: id}}"
    >
      {tiles[id]}
    </div>
  {/each}
</div>


<style>
  .box {
    height: 85px;
    width: 85px;
    border-radius: 5px;
    background-color: #cdc1b4;
    padding: 0;
    margin: 5px;
  }

  .tile {
    position: absolute;
    height: 85px;
    width: 85px;
    border-radius: 5px;
    font-size: 2.2em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
