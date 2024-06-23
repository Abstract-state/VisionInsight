from flask import Flask, request, jsonify
from flask_cors import CORS
from detectors.yolo_detector import YoloDetector
from tracker.deepsort_tracker import create_tracker
import cv2
import time
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = './uploads'
OUTPUT_FOLDER = './output'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

detector = YoloDetector(model_name='yolov5s.pt')
object_tracker = create_tracker()

@app.route('/process_video', methods=['POST'])
def process_video():
    video_file = request.files['video']
    object_name = request.form['object_name']
    video_path = os.path.join(UPLOAD_FOLDER, video_file.filename)
    video_file.save(video_path)

    cap = cv2.VideoCapture(video_path)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    output_video_path = os.path.join(OUTPUT_FOLDER, f'output_{video_file.filename}')
    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), 30, (frame_width, frame_height))

    while cap.isOpened():
        success, img = cap.read()
        if not success:
            break
        start = time.perf_counter()
        results = detector.score_frame(img)
        img, detections = detector.plot_boxes(results, img, object_name, height=img.shape[0], width=img.shape[1], confidence=0.5)
        tracks = object_tracker.update_tracks(detections, frame=img)

        for track in tracks:
            if not track.is_confirmed():
                continue
            track_id = track.track_id
            ltrb = track.to_ltrb()
            bbox = ltrb
            cv2.rectangle(img, (int(bbox[0]), int(bbox[1])), (int(bbox[2]), int(bbox[3])), (0, 0, 255), 2)
            cv2.putText(img, "ID: " + str(track_id), (int(bbox[0]), int(bbox[1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        end = time.perf_counter()
        totalTime = end - start
        fps = 1 / totalTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 2)
        out.write(img)
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    return jsonify({'message': 'Video processed successfully', 'output_video': output_video_path})

if __name__ == '__main__':
    app.run(debug=True)
