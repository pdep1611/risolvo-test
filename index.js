
import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [emotion, setEmotion] = useState('');
  const [target, setTarget] = useState('');
  const [style, setStyle] = useState('');
  const [brand, setBrand] = useState('');
  const [notes, setNotes] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    const finalPrompt = `Crea un contenuto per ottenere: ${goal}, che susciti: ${emotion}, rivolto a: ${target}, con uno stile: ${style}. Il contenuto è per il brand o persona: ${brand}. Note aggiuntive: ${notes}`;
    setPrompt(finalPrompt);
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("❌ Errore nella generazione del contenuto. Riprova più tardi.");
    } finally {
      setLoading(false);
      setStep(6);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      {step === 1 && (
        <div>
          <h2>1. Cosa vuoi ottenere?</h2>
          <button onClick={() => { setGoal('Attirare attenzione'); setStep(2); }}>Attirare attenzione</button>
          <button onClick={() => { setGoal('Farti conoscere'); setStep(2); }}>Farmi conoscere</button>
          <button onClick={() => { setGoal('Vendere qualcosa'); setStep(2); }}>Vendere qualcosa</button>
          <button onClick={() => { setGoal('Dare valore'); setStep(2); }}>Dare valore</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>2. Che emozione vuoi suscitare?</h2>
          <button onClick={() => { setEmotion('Sorriso'); setStep(3); }}>Sorriso</button>
          <button onClick={() => { setEmotion('Riflessione'); setStep(3); }}>Riflessione</button>
          <button onClick={() => { setEmotion('Azione'); setStep(3); }}>Azione</button>
          <button onClick={() => { setEmotion('Empatia'); setStep(3); }}>Empatia</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>3. A chi ti rivolgi?</h2>
          <button onClick={() => { setTarget('Freelance'); setStep(4); }}>Freelance</button>
          <button onClick={() => { setTarget('Clienti'); setStep(4); }}>Clienti</button>
          <button onClick={() => { setTarget('Colleghi'); setStep(4); }}>Colleghi</button>
          <button onClick={() => { setTarget('Datori di lavoro'); setStep(4); }}>Datori di lavoro</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>4. Che stile vuoi usare?</h2>
          <button onClick={() => { setStyle('Ispirazionale'); setStep(5); }}>Ispirazionale</button>
          <button onClick={() => { setStyle('Ironico'); setStep(5); }}>Ironico</button>
          <button onClick={() => { setStyle('Professionale'); setStep(5); }}>Professionale</button>
          <button onClick={() => { setStyle('Semplice'); setStep(5); }}>Semplice</button>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2>5. Nome brand o persona:</h2>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Es. Marco Rossi / Studio XYZ" />
          <h3>Note aggiuntive:</h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Scrivi qui qualcosa che vuoi sia preso in considerazione" />
          <button onClick={generatePrompt}>Genera contenuto AI</button>
        </div>
      )}
      {step === 6 && (
        <div>
          <h2>✨ Prompt generato:</h2>
          <textarea value={prompt} readOnly style={{ width: '100%', height: '100px' }} />
          <h2>🎉 Risultato generato da Risolvo.ai:</h2>
          {loading ? (
            <p>⏳ Sto pensando... un attimo!</p>
          ) : (
            <textarea value={result} readOnly style={{ width: '100%', height: '300px' }} />
          )}
          <button onClick={() => setStep(1)}>Crea un altro</button>
        </div>
      )}
    </div>
  );
}
