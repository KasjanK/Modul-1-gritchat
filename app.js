// get peer id from UR
const myPeerId = location.hash.slice(1);

// connect to peer server
peer = new Peer(myPeerId, {
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});

// print peer id on connection "open" event.
peer.on("open", (id) => {
  const myPeerIdEl = document.querySelector(".my-peer-id");
  myPeerIdEl.innerText = id;
});

// error message if there is an error(duh)
peer.on("error", (errorMessage) => {
  console.error(errorMessage);
});

// event listener for click "refresh list"
const peersEl = document.querySelector(".peers");
const refreshPeersButtonEl = document.querySelector(".list-all-peers-button");
refreshPeersButtonEl.addEventListener("click", (e) => {
  peer.listAllPeers((peers) => {
    // add peers to html document
    const peersList = peers
      // filter out our own name
      .filter((peerId) => peerId !== peer._id)
      // loop through all peers and print them as buttons in a list
      .map((peer) => {
        return `
        <li>
        <button class="connect-button peerId-${peer}">${peer}</button>
        </li>
        `;
      })
      .join("");
    peersEl.innerHTML = `<ul>${peersList}</ul>`;
  });
});
