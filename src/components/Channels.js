const Channels = ({
  account,
  provider,
  contract,
  channels,
  currentChannel,
  setCurrentChannel,
}) => {
  const channelHandler = async (channel) => {
    const hasJoined = await contract.hasJoined(channel.id, account);
    if (hasJoined) {
      setCurrentChannel(channel);
      console.log("joined channel!");
    } else {
      const signer = await provider.getSigner();
      const tx = await contract
        .connect(signer)
        .mint(channel.id, { value: channel.cost });
      await tx.wait();
    }
  };

  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Text Channels</h2>

        <ul>
          {channels.map((channel, index) => (
            <li
              key={index}
              onClick={() => channelHandler(channel)}
              className={
                currentChannel && // important: we are short-circuit the evaluation of the second operand
                currentChannel.id.toString() === channel.id.toString()
                  ? "active"
                  : ""
              }
            >
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="channels__voice">
        <h2>Voice Channels</h2>

        <ul>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Channels;
