import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Force fresh downloads if old broken files were cached
env.useBrowserCache = true;
env.allowLocalModels = false;

const MODEL_NAME = 'Xenova/distilbart-cnn-6-6';
const MIN_CHARS  = 80;

const summarizeBtn  = document.getElementById('summarize-btn');
const useSummaryBtn = document.getElementById('use-summary-btn');
const messageInput  = document.getElementById('message');
const summaryBox    = document.getElementById('summary-box');
const summaryText   = document.getElementById('summary-text');
const summaryStatus = document.getElementById('summary-status');

let summarizer = null;
let lastSummary = '';

function showBox(statusMsg, summaryMsg = '') {
    summaryBox.classList.add('visible');
    summaryStatus.textContent = statusMsg;
    summaryText.textContent   = summaryMsg;
    useSummaryBtn.hidden = !summaryMsg;
}

async function loadModel() {
    if (summarizer) return summarizer;
    showBox('Loading AI model (one-time download, ~80MB)...');
    summarizer = await pipeline('summarization', MODEL_NAME, {
        quantized: true, // v2 API: load q8 ONNX (smaller, stable)
        progress_callback: (data) => {
            if (data.status === 'progress' && typeof data.progress === 'number') {
                showBox(`Loading model: ${Math.round(data.progress)}%`);
            }
        },
    });
    return summarizer;
}

summarizeBtn.addEventListener('click', async () => {
    const text = messageInput.value.trim();

    if (text.length < MIN_CHARS) {
        showBox(`Please write at least ${MIN_CHARS} characters before summarizing.`);
        return;
    }

    summarizeBtn.disabled = true;
    const originalLabel = summarizeBtn.textContent;
    summarizeBtn.textContent = 'Working...';

    try {
        const model = await loadModel();

        // Warn before inference — this is the step that freezes the page
        const ok = confirm(
            'The page will freeze for a few seconds while the AI model processes ' +
            'your message in your browser.\n\n' +
            'Continue?'
        );
        if (!ok) {
            showBox('Summarization cancelled.');
            return;
        }

        showBox('Generating summary...');

        // Yield to browser so the status text repaints before the freeze
        await new Promise(resolve => setTimeout(resolve, 50));

        const output = await model(text, {
            max_new_tokens: 100,
            min_new_tokens: 20,
        });

        lastSummary = output[0].summary_text.trim();
        showBox('✨ AI-generated summary:', lastSummary);
    } catch (err) {
        console.error('Summarization failed:', err);
        summarizer = null; // force re-init on next click
        showBox('Sorry, the summarizer is unavailable right now. Please try again in a moment.');
    } finally {
        summarizeBtn.disabled = false;
        summarizeBtn.textContent = originalLabel;
    }
});

useSummaryBtn.addEventListener('click', () => {
    if (!lastSummary) return;
    messageInput.value = lastSummary;
    messageInput.focus();
    showBox('✓ Message replaced with summary.');
});
