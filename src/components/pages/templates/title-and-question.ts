const titleAndQuestionTemplate = `
  <div style="height: 100vh; width: 100vw; background-color: #00AA46; color: #ffffff; display: flex; flex: 1; flex-direction: column; padding: 10%; box-sizing: border-box;">
    <div style="display: flex; flex: 1; flex-direction: column;">
      <h1 style="margin: 0; padding: 0; text-transform: uppercase; font-size: 12rem; font-family: SBonusDisplay-Black;">Otsikko</h1>
      <div style="width: 100%; display: flex; flex: 1; flex-direction: column; gap: 6rem; justify-content: center; margin-top: 10%;">
        <div data-component="question"></div>
      </div>
    </div>
    <button style="width: 100%; background-color: transparent; border: none; color: #ffffff; height: 250px; font-family: SBonusText-Bold; font-size: 6rem;">Seuraava</button>
  </div>`;

export default titleAndQuestionTemplate;

// Button styles for options
// width: 100%;
// height: 250px;
// font-size: 6rem;
// font-family: 'SBonusText-Bold';
// color: #fff;
// background: transparent;
// border: 20px solid #fff;
