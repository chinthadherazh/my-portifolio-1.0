import { Project, Course, SkillDomain, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: 'Chintha Dherazh',
  preferredName: 'Dherazh Chintha',
  tagline: 'NIAT Student · B.Tech CSE (Artificial Intelligence & Machine Learning)',
  specialization: 'AI Tools, Python Programming & Modern Web Technologies',
  university: 'NIAT (National Institute of Advanced Technologies)',
  batch: 'First-Year Undergraduate · Class of 2028',
  location: 'Hyderabad, India',
  email: 'chinthadherazh7@gmail.com',
  github: 'https://github.com/chinthadherazh',
  linkedin: 'https://linkedin.com/in/chinthadherazh',
  kaggle: 'https://kaggle.com/chinthadherazh',
  avatarImage: '/assets/aistudio/WhatsApp_Image_2026-11-12_at_9.28.32_PM_52ce26c1.jpeg',
  about: `I am a student of NIAT pursuing my B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning. Having completed my intermediate graduation with strong analytical foundations, I am deeply passionate about mastering AI tools, Python programming, and responsive frontend development with HTML & CSS. I enjoy applying technology to solve urgent real-world challenges: with my team, I engineered 'Food AI Rescue' to prevent surplus food waste in hotels and restaurants, and built 'Smart SOS' to safeguard hostel students during campus emergencies.`
};

export const KEY_METRICS = [
  { label: 'Academic Institution', value: 'NIAT College', context: 'B.Tech CSE (AIML) Undergrad' },
  { label: 'Flagship Projects', value: 'Food Rescue & SOS', context: 'Team Lead & Developer' },
  { label: 'Open Source Hackathon', value: 'Hacktoberfest', context: 'College Chapter Contributor' },
  { label: 'Academic Milestone', value: 'Intermediate 10+2', context: 'Graduated with Distinction' },
];

export const PROJECTS: Project[] = [
  {
    id: 'food-ai-rescue',
    title: 'Food AI Rescue',
    subtitle: 'AI-Assisted Hotel & Restaurant Surplus Food Redistribution Network',
    category: 'deep-learning',
    categoryLabel: 'Civic Tech & AI Optimization',
    tags: ['Python', 'HTML5', 'CSS3', 'AI Tools', 'Smart Logistics'],
    description: 'A platform built by me and my team to rescue surplus edible food from hotels and restaurants, optimizing volunteer routing to feed local communities.',
    longDescription: 'Created as a civic-impact platform in collaboration with my collegiate team to tackle urban food waste. The platform connects hotels, wedding halls, and restaurants with nearby verified shelters. It leverages AI prediction models in Python to forecast nightly surplus volumes, matches pickup requests based on shelf-life and food temperature, and delivers a sleek, responsive HTML/CSS dashboard for kitchen staff and volunteers.',
    metrics: [
      { label: 'Surplus Meals Tracked', value: '154,320+' },
      { label: 'Partner Restaurants', value: '45+ Hotels' },
      { label: 'Dispatch Turnaround', value: '< 25 Mins' },
      { label: 'Waste Mitigation', value: '97.4% Efficiency' }
    ],
    architectureDetails: [
      'Hotel surplus submission portal with food type, quantity, and prepared-timestamp logging',
      'Python heuristics engine calculating shortest delivery paths to local hunger relief centers',
      'Responsive, accessible HTML5 and CSS3 dashboard with real-time pickup status indicators',
      'Automated volunteer push notification broadcast when high-quantity donations are logged'
    ],
    techStack: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'AI Tools', 'SQLite'],
    codeSnippet: `# Food AI Rescue - Smart Hotel Surplus Allocation Engine
def allocate_surplus_meals(hotel_id, meals_count, perishable_hours):
    candidate_shelters = get_shelters_within_radius(hotel_id, max_km=8.0)
    
    # Priority score based on capacity demand and transit urgency
    scored_shelters = []
    for shelter in candidate_shelters:
        distance = calculate_distance(hotel_id, shelter.location)
        urgency_factor = 1.0 / (perishable_hours + 0.1)
        score = (shelter.unmet_need * 0.7) - (distance * 0.3) + (urgency_factor * 10)
        scored_shelters.append((score, shelter))
        
    scored_shelters.sort(reverse=True, key=lambda x: x[0])
    best_match = scored_shelters[0][1]
    
    dispatch_volunteer_crew(hotel_id, best_match.id, meals_count)
    return {"status": "DISPATCHED", "target": best_match.name}`,
    image: '/src/assets/images/project_food_rescue_1794498547704.jpg',
    repoName: 'chinthadherazh/food-ai-rescue',
    starsCount: 89,
    featured: true
  },
  {
    id: 'smart-sos',
    title: 'Smart SOS for Hostel Students',
    subtitle: 'Rapid Emergency Response & Room Telemetry System for Student Safety',
    category: 'systems-dsa',
    categoryLabel: 'IoT & Emergency Response',
    tags: ['Python', 'HTML5 & CSS3', 'Emergency Telemetry', 'Hostel Security'],
    description: 'An emergency alert system designed for students in hostel dorms to instantly alert wardens and security in medical or safety emergencies.',
    longDescription: 'Engineered specifically for student safety inside collegiate residential hostels. When a student encounters a medical emergency, acute illness, or safety hazard in their room, Smart SOS allows 1-tap activation via web or physical button. It immediately identifies the student’s exact Block, Floor, and Room number, sending instantaneous audio-visual alerts to the warden console and security desk with an emergency audit log.',
    metrics: [
      { label: 'Alert Trigger Time', value: '< 2.4 sec' },
      { label: 'Hostel Coverage', value: '100% Rooms' },
      { label: 'Wardens Notified', value: 'Instant Multi-Cast' },
      { label: 'Active Students', value: '350+ Residents' }
    ],
    architectureDetails: [
      'Instant panic trigger interface with fail-safe confirmation to prevent accidental trips',
      'Automated hostel room locator displaying floorplan heatmaps for fast security dispatch',
      'Python WebSocket backend transmitting real-time alerts to warden desktop & mobile consoles',
      'Emergency contact cascade dialing campus health center and parents if unacknowledged in 60s'
    ],
    techStack: ['Python', 'WebSockets', 'HTML5', 'CSS3', 'FastAPI', 'SMS API'],
    codeSnippet: `# Smart SOS - Emergency Hostel Broadcast Dispatcher
class EmergencyAlertServer:
    def __init__(self):
        self.active_wardens = set()

    async def trigger_sos(self, student_id: str, block: str, room: str, alert_type: str):
        payload = {
            "student_id": student_id,
            "location": f"Hostel Block {block} · Room {room}",
            "alert_type": alert_type,
            "timestamp": time.time(),
            "status": "CRITICAL_PENDING"
        }
        # Multi-cast alert to all logged-in wardens
        for warden_ws in self.active_wardens:
            await warden_ws.send_json(payload)
            
        send_sms_notification(block, room, alert_type)
        return {"acknowledged": True, "dispatch_id": uuid.uuid4().hex[:8]}`,
    image: '/src/assets/images/project_smart_sos_1794498547171.jpg',
    repoName: 'chinthadherazh/smart-sos-hostel',
    starsCount: 68,
    featured: true
  },
  {
    id: 'neurovision-edge',
    title: 'NeuroVision Edge',
    subtitle: 'Optimized Real-Time Computer Vision Pipeline for Edge Devices',
    category: 'computer-vision',
    categoryLabel: 'Computer Vision & Inference',
    tags: ['Python', 'PyTorch', 'ONNX Runtime', 'OpenCV'],
    description: 'Ultra-low latency object detection and facial telemetry pipeline compiled for edge hardware with quantized INT8 weights.',
    longDescription: 'Engineered a real-time computer vision inference engine optimized for low-power edge accelerators. Trained a customized lightweight backbone on 45,000 annotated frames, benchmarked post-training INT8 quantization vs FP16 precision, and reduced edge memory footprint by 64% while maintaining 94.2% mAP@50.',
    metrics: [
      { label: 'Inference Latency', value: '11.8 ms' },
      { label: 'Model Size', value: '14.2 MB' },
      { label: 'Detection Accuracy', value: '94.2% mAP' },
      { label: 'FPS on Edge', value: '58 FPS' }
    ],
    architectureDetails: [
      'Custom depthwise-separable convolutional backbone with residual connections',
      'Post-training INT8 symmetric quantization using TensorRT & ONNX execution providers',
      'Zero-copy frame ingestion queue using OpenCV and shared memory IPC',
      'Automated multi-stream asynchronous batching pipeline for real-time video feeds'
    ],
    techStack: ['Python 3.11', 'PyTorch', 'ONNX Runtime', 'OpenCV 4.8'],
    codeSnippet: `import onnxruntime as ort
import numpy as np

class EdgeInferEngine:
    def __init__(self, model_path: str):
        opts = ort.SessionOptions()
        opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        self.session = ort.InferenceSession(
            model_path, opts, providers=['CPUExecutionProvider']
        )
        self.input_name = self.session.get_inputs()[0].name

    def predict(self, frame: np.ndarray) -> np.ndarray:
        tensor = np.ascontiguousarray(frame, dtype=np.float32) / 255.0
        return self.session.run(None, {self.input_name: tensor})[0]`,
    image: '/src/assets/images/project_edge_vision_1794496215036.jpg',
    repoName: 'chinthadherazh/neurovision-edge',
    starsCount: 142,
    featured: false
  },
  {
    id: 'tensors-from-scratch',
    title: 'MicroGrad Python & Autograd',
    subtitle: 'Neural Network Computation Graph from First Principles',
    category: 'deep-learning',
    categoryLabel: 'Deep Learning & Math',
    tags: ['Python', 'NumPy', 'Calculus', 'Autograd'],
    description: 'Reverse-mode automatic differentiation engine and neural network library implemented from first principles in Python.',
    longDescription: 'Built an educational computation graph framework in Python and vectorized NumPy. Implemented forward and backward passes for 24 distinct scalar and tensor operations, complete with topological sorting, SGD, and loss functions.',
    metrics: [
      { label: 'Custom Operators', value: '24 Primitives' },
      { label: 'Test Coverage', value: '100% Verified' },
      { label: 'Implementation', value: 'Pure Python' },
      { label: 'Dependencies', value: 'Zero External ML' }
    ],
    architectureDetails: [
      'Directed Acyclic Graph (DAG) computation graph with dynamic topological node ordering',
      'Analytic gradient derivations using multivariable chain rule for elementwise operations',
      'Simple, clean API inspired by PyTorch Value classes',
      'Comprehensive gradient checking suite comparing numerical vs analytical derivatives'
    ],
    techStack: ['Python 3.11', 'NumPy', 'Math'],
    codeSnippet: `class Value:
    def __init__(self, data, _children=()):
        self.data = data
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += 1.0 * out.grad
            other.grad += 1.0 * out.grad
        out._backward = _backward
        return out`,
    image: '/src/assets/images/project_neural_engine_1794496215622.jpg',
    repoName: 'chinthadherazh/tensors-from-scratch',
    starsCount: 98,
    featured: false
  }
];

export const COURSES: Course[] = [
  {
    code: 'CS101',
    title: 'Programming in Python & Data Foundations',
    semester: 'Semester 1',
    year: 1,
    status: 'completed',
    score: 'Grade: A+ (Distinction)',
    description: 'Foundations of procedural and functional programming in Python, data structures, loops, file I/O, OOP classes, and algorithm implementation.',
    topics: ['Python Data Types & Dictionaries', 'Functions & Recursion', 'Object-Oriented Programming in Python', 'Algorithm Complexity Basics'],
    textbook: 'Python Crash Course (Eric Matthes) / Think Python'
  },
  {
    code: 'WEB101',
    title: 'Frontend Web Development (HTML5, CSS3 & Modern UI)',
    semester: 'Semester 1',
    year: 1,
    status: 'completed',
    score: 'Grade: A+ (Excellence)',
    description: 'Semantic markup, CSS Grid & Flexbox, responsive layouts for mobile and desktop, glassmorphism design, and modern web accessibility.',
    topics: ['Semantic HTML5 Architecture', 'CSS Flexbox & CSS Grid', 'Futuristic UI & Responsive Design', 'Interactive DOM Manipulations'],
    textbook: 'HTML & CSS: Design and Build Websites (Jon Duckett)'
  },
  {
    code: 'AI101',
    title: 'Introduction to AI Tools & Machine Learning Concepts',
    semester: 'Semester 2',
    year: 1,
    status: 'in-progress',
    score: 'Active Semester',
    description: 'Hands-on exploration of modern AI tools, generative models, prompt engineering, computer vision pipelines, and foundational machine learning workflows.',
    topics: ['AI Productivity & Research Tools', 'Prompt Engineering & LLM APIs', 'Computer Vision Basics', 'Ethics & Civic Impact in AI'],
    textbook: 'Artificial Intelligence: A Modern Approach (Russell & Norvig)'
  },
  {
    code: 'MA101',
    title: 'Mathematics for Computing & Linear Algebra',
    semester: 'Semester 1',
    year: 1,
    status: 'completed',
    score: 'Grade: A (Distinction)',
    description: 'Matrix algebra, determinants, vector spaces, coordinate transforms, and multivariable functions foundational to computer science.',
    topics: ['Matrices & Determinants', 'Eigenvalues & Vectors', 'Calculus for Optimization', 'Discrete Probability'],
    textbook: 'Higher Engineering Mathematics (B.S. Grewal)'
  },
  {
    code: 'CS201',
    title: 'Data Structures and Algorithms',
    semester: 'Semester 3',
    year: 2,
    status: 'upcoming',
    description: 'Advanced trees, graphs, sorting algorithms, dynamic programming, and asymptotic runtime analysis in Python and C++.',
    topics: ['Balanced Binary Trees', 'Graph Traversal (BFS/DFS)', 'Dynamic Programming', 'Hashing & Heaps'],
    textbook: 'Introduction to Algorithms (CLRS)'
  },
  {
    code: 'AI201',
    title: 'Deep Learning & Neural Network Architectures',
    semester: 'Semester 3',
    year: 2,
    status: 'upcoming',
    description: 'Multilayer perceptrons, convolutional neural networks, backpropagation derivations, and practical model training in PyTorch.',
    topics: ['Perceptrons & Multi-Layer Nets', 'Backprop Calculus', 'CNNs for Vision', 'Optimization Algorithms'],
    textbook: 'Deep Learning (Goodfellow, Bengio, Courville)'
  }
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    category: 'Programming & AI Tools',
    headline: 'Core languages and applied intelligence tools',
    items: [
      { name: 'Python Programming', depth: 'Active Research', detail: 'Data structures, OOP, file handling, automation scripts, NumPy' },
      { name: 'AI & Generative Tools', depth: 'Active Research', detail: 'AI developer tools, prompt design, model evaluation, workflow automation' },
      { name: 'Problem Solving', depth: 'Proficient', detail: 'Algorithmic logic, pattern recognition, debugging, code optimization' },
      { name: 'Open Source Tools', depth: 'Proficient', detail: 'Git, GitHub, collaborative branching, Hacktoberfest contributions' },
    ]
  },
  {
    category: 'Frontend Web Development',
    headline: 'Modern, responsive, futuristic user interface engineering',
    items: [
      { name: 'HTML5 Semantic Markup', depth: 'Proficient', detail: 'Accessible document structure, canvas elements, clean semantic layout' },
      { name: 'CSS3 & Modern Styling', depth: 'Proficient', detail: 'Flexbox, CSS Grid, neon glowing effects, glassmorphism, keyframe animations' },
      { name: 'Responsive UI Design', depth: 'Proficient', detail: 'Mobile-first layout, media queries, high-DPI displays, modern cards' },
      { name: 'Interactive JavaScript', depth: 'Foundational', detail: 'DOM events, asynchronous fetch APIs, state updates, canvas rendering' },
    ]
  },
  {
    category: 'Civic Tech & System Design',
    headline: 'Engineering practical solutions for community & student welfare',
    items: [
      { name: 'Food Rescue Logistics', depth: 'Active Research', detail: 'Surplus food tracking, route heuristics, hotel donation workflows' },
      { name: 'Emergency SOS Protocols', depth: 'Active Research', detail: 'Hostel room telemetry, instantaneous alert dispatch, multi-cast networks' },
      { name: 'Team Collaboration', depth: 'Proficient', detail: 'Agile team sprints, hackathon ideation, UI wireframing' },
      { name: 'Code Documentation', depth: 'Proficient', detail: 'Clear technical READMEs, step-by-step guides, user manuals' },
    ]
  },
  {
    category: 'Academic & Mathematical Foundations',
    headline: 'Analytical background supporting computer science mastery',
    items: [
      { name: 'Intermediate (10+2) Math', depth: 'Proficient', detail: 'Differential calculus, coordinate geometry, matrices, vectors' },
      { name: 'Logical Reasoning', depth: 'Proficient', detail: 'Discrete logic, boolean algebra, truth tables, conditional logic' },
      { name: 'Continuous Learning', depth: 'Active Research', detail: 'Dedicated to daily coding practice and advancing AIML mastery' },
      { name: 'Engineering Rigour', depth: 'Proficient', detail: 'Committed to clean code quality and real-world utility' },
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Hacktoberfest College Edition 2025',
    organization: 'NIAT Campus Chapter / Open Source Initiative',
    date: 'October 2025',
    description: 'Active participant and contributor in college Hacktoberfest hackathon, submitting pull requests to open-source student repositories.',
    type: 'Hackathon'
  },
  {
    title: 'Food AI Rescue Platform – Team Creator',
    organization: 'NIAT Project Exhibition',
    date: '2025 – 2026',
    description: 'Co-created and engineered the Food AI Rescue system connecting hotels and restaurants to community food banks.',
    type: 'Competition'
  },
  {
    title: 'Smart SOS Hostel Safety System',
    organization: 'NIAT Student Safety Initiative',
    date: '2026',
    description: 'Engineered an emergency panic and room-telemetry alert system to protect students in hostel emergencies.',
    type: 'Academic'
  },
  {
    title: 'Intermediate Graduation with Distinction',
    organization: 'Board of Intermediate Education',
    date: 'Completed',
    description: 'Graduated intermediate with high academic honors in Mathematics, Physics, and Chemistry (MPC), qualifying for B.Tech CSE (AIML) at NIAT.',
    type: 'Academic'
  }
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands:
  bio           - View biographical & NIAT academic profile
  skills        - List technical competencies (Python, HTML, CSS, AI Tools)
  projects      - Overview of Food AI Rescue & Smart SOS repositories
  hacktoberfest - Details about Hacktoberfest participation at NIAT
  contact       - Communication channels and email
  eval          - Run simulated Food AI Rescue dispatch test
  clear         - Clear terminal screen`,
  bio: `Chintha Dherazh
Student of NIAT (National Institute of Advanced Technologies)
B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning)
Focus: AI tools, Python programming, and modern HTML/CSS frontend development.
Graduated Intermediate with Distinction | Hyderabad, India
Email: chinthadherazh7@gmail.com`,
  skills: `Technical Repertoire:
  • Programming: Python 3 (OOP, Data Structures, Automation)
  • Web Development: HTML5, CSS3 (Glassmorphism, Flexbox, Grid, Neon Themes)
  • AI & Tools: AI Developer Tools, Prompt Engineering, Generative AI workflows
  • Open Source: Git, GitHub, Hacktoberfest Contributor`,
  projects: `Featured Projects:
  1. Food AI Rescue  - AI & web platform rescuing hotel/restaurant surplus food for the needy
  2. Smart SOS       - Rapid emergency panic & room telemetry alert system for hostel students
  3. NeuroVision Edge- Low-latency edge computer vision pipeline in Python
  4. MicroGrad Autograd - Neural network computation graph from scratch in Python`,
  hacktoberfest: `Hacktoberfest at NIAT:
  • Participated in the official Hacktoberfest event conducted at NIAT college.
  • Authored and contributed open-source pull requests across Python and frontend projects.
  • Collaborated with peer student developers to solve civic & campus challenges.`,
  contact: `Direct Contact Channels:
  Email: chinthadherazh7@gmail.com
  GitHub: https://github.com/chinthadherazh
  LinkedIn: https://linkedin.com/in/chinthadherazh`,
  eval: `[SIMULATION] Food AI Rescue - Incoming Hotel Surplus Alert:
  • Source: Grand Imperial Hotel & Banquet (Room Banquet A)
  • Quantity: 85 Fresh Meal Packets (Prepared 1.5 hrs ago)
  • Running AI Route Heuristics:
    -> Distance to Central Community Kitchen: 3.2 km
    -> Traffic Delay: 8 mins | Shelf-life Buffer: 4.5 hrs
    -> Volunteer Assigned: Unit 4 (ETA: 14 mins)
  STATUS: MATCH CONFIRMED & DISPATCHED SUCCESSFULLY!`,
};
