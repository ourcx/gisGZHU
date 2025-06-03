
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import { fromLonLat } from 'ol/proj';
import { get as getProjection, METERS_PER_UNIT } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { useContorlStore } from "../store/contorl"



function addPoint(lonLat, source, map, name, text = '') {
  const coordinate = fromLonLat(lonLat); // 坐标转换

  // 创建点要素
  const pointFeature = new Feature({
    geometry: new Point(coordinate),
    name: name // 存储地名属性
  });

  // 添加默认样式（可选）
  pointFeature.setStyle(
    new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#4a90e2' })
      })
    })
  );

  pointFeature.setProperties({ text: text })

  source.addFeature(pointFeature);

  // 创建 HTML 标签 Overlay
  const labelEl = document.createElement('div');
  labelEl.className = 'map-label';
  labelEl.textContent = name;
  labelEl.appendChild(document.createElement('br'));
  const childrens = labelEl.appendChild(document.createElement('p'));
  childrens.className = 'map-label-children';
  childrens.textContent = text;
  labelEl.addEventListener('click', () => {
    labelEl.style.display = 'none';
  })

  setTimeout(() => {
    labelEl.remove();
  }, 5000)


  const labelOverlay = new Overlay({
    element: labelEl,
    position: coordinate,
    positioning: 'bottom-center',
    stopEvent: false // 允许标签交互
  });

  map.addOverlay(labelOverlay);

  // 返回 Overlay 以便后续管理
  return labelOverlay;
}


function point(lonLat, source, map, name, text = '') {
  const ControlStore = useContorlStore()
  const img = document.createElement('img');
  img.className = 'label-img';


  ControlStore.list.forEach(item => {
    if (item.name == name) {
      img.src = item.img;
      img.style.width = '60px';
    }
  })

  const coordinate = fromLonLat(lonLat); // 坐标转换
  // 创建点要素
  const pointFeature = new Feature({
    geometry: new Point(coordinate),
    name: name // 存储地名属性
  });

  pointFeature.setProperties({ text: text })

  // 添加默认样式（可选）
  pointFeature.setStyle(
    new Style({
      image: new Circle({
        radius: 4,
        fill: new Fill({ color: '#4a90e2' })
      })
    })
  );

  source.addFeature(pointFeature);
  // 创建 HTML 标签 Overlay
  const labelEl = document.createElement('div');
  labelEl.className = 'label';
  labelEl.textContent = name;
  labelEl.appendChild(document.createElement('br'));
  labelEl.appendChild(img);



  const labelOverlay = new Overlay({
    element: labelEl,
    position: coordinate,
    positioning: 'bottom-center',
    stopEvent: false // 允许标签交互
  });

  map.addOverlay(labelOverlay);
}


function removePoint(source, map) {
  source.getFeatures().forEach(feature => {
    if (feature.values_.name != "广州大学桂花岗校区") {
      source.removeFeature(feature);
    }
    const label = document.querySelector('.label');
    if (label) {
      label.remove();
    }
  })

  map.render();
}


function startPoint(source, map) {

  point([113.26589283054267, 23.14849477003483], source, map, '5号楼', "桂花岗图书馆和日常上课的地方,图书馆/教室")
  point([113.2659751816075, 23.147520767568835], source, map, '南D', "本科生宿舍")
  point([113.26557276599142, 23.14806123950214], source, map, '饭堂', "三层饭堂,再上面是宿舍")
  point([113.26495656313652, 23.148553273520818], source, map, '足球场', "校园跑和军训地点")
  point([113.26530336943097, 23.149484825277113], source, map, '1号楼', "教务处,平时领东西和找辅导员")
  point([113.26583264445048, 23.14964953147205], source, map, '南门', "庆大门")
  point([113.26553123944764, 23.150068602834523], source, map, '乒乓球室和舞蹈室', "在北区,楼里面,从外面进去")
  point([113.26560404516607, 23.150609007703792], source, map, '11号楼', "有些课在这里上")
  point([113.26602492351883, 23.15111568909228], source, map, '研究生宿舍', "宿舍")
  point([113.26721412897234, 23.148389142303813], source, map, '后山', "篮球场,羽毛球场,后山很大,走楼梯上去")
}


function updateLabelSize(map, view) {
  const resolution = map.getView().getResolution();
  const units = map.getView().getProjection().getUnits();
  const dpi = 96; // 标准屏幕DPI
  const mpu = METERS_PER_UNIT[units];
  const scale = resolution * mpu * dpi / 0.0254; // 换算比例尺

  // 根据比例尺动态调整（示例公式）
  const fontSize = Math.min(Math.max(scale / 5000, 8), 32);

  // 更新所有标签样式
  map.getOverlays().forEach(overlay => {
    const element = overlay.getElement();
    if (element && element.classList.contains('map-label')) {
      element.style.fontSize = `${fontSize}px`;
      // 同步调整其他依赖尺寸的样式（如padding）
      element.style.padding = `${fontSize / 4}px ${fontSize / 2}px`;
    }
  });

  if (view.getZoom() <= 13) {
    map.getOverlays().forEach(overlay => {
      const element = overlay.getElement();
      element.style.display = 'none';
    })
  } else {
    map.getOverlays().forEach(overlay => {
      const element = overlay.getElement();
      element.style.display = 'block';
    })
  }

  map.render();


}









export { addPoint, point, updateLabelSize, removePoint, startPoint }