import { ReactInstance } from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  r360.renderToSurface(
    r360.createRoot('SpaceSceneVR', {}),
    r360.getDefaultSurface()
  );

  r360.compositor.setBackground(r360.getAssetURL('textures/space.png'));
}

window.React360 = {init};
