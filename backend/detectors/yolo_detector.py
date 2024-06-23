import torch
import cv2
import numpy as np
import os

class YoloDetector:
    def __init__(self, model_name):
        weights_path = os.path.join('weights', model_name)
        self.model = self.load_model(weights_path)
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("Using Device: ", self.device)

    def load_model(self, weights_path):
        if weights_path:
            model = torch.hub.load('ultralytics/yolov5', 'custom', path=weights_path, force_reload=True)
        else:
            model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        return model

    def score_frame(self, frame):
        self.model.to(self.device)
        downscale_factor = 2
        width = int(frame.shape[1] / downscale_factor)
        height = int(frame.shape[0] / downscale_factor)
        frame = cv2.resize(frame, (width, height))
        results = self.model(frame)
        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord

    def class_to_label(self, x):
        return self.classes[int(x)]

    def plot_boxes(self, results, frame, object_name, height, width, confidence=0.3):
        labels, cord = results
        detections = []
        n = len(labels)
        x_shape, y_shape = width, height

        for i in range(n):
            row = cord[i]
            if row[4] >= confidence and self.class_to_label(labels[i]) == object_name:
                x1, y1, x2, y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                x_center = x1 + (x2 - x1)
                y_center = y1 + ((y2 - y1) / 2)
                tlwh = np.asarray([x1, y1, int(x2-x1), int(y2-y1)], dtype=np.float32)
                confidence = float(row[4].item())
                detections.append(([x1, y1, int(x2-x1), int(y2-y1)], row[4].item(), object_name))

        return frame, detections
