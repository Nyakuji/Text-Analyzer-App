import React, { useState, useEffect, useRef } from 'react';
import Sentiment from 'sentiment';
import WordFrequencyChart from './WordFrequencyChart';
import { Text, Spacer, Heading, Textarea, Button, useColorModeValue } from '@chakra-ui/react';

const TextAnalyzer = () => {

    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [sentimentScore, setSentimentScore] = useState(0);
    const [sentimentResult, setSentimentResult] = useState('');
    const [wordFrequency, setWordFrequency] = useState({});
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [showPasteMessage, setShowPasteMessage] = useState(false);
    const typingStartTime = useRef<number | null>(null);
    const typingEndTime = useRef<number | null>(null);
    const typingCharsCount = useRef<number>(0); // Store the count of characters typed


    const handleClear = () => {
        setText('');
        setWordCount(0);
        setCharacterCount(0);
        setSentimentScore(0);
        setSentimentResult('');
        setWordFrequency({});
        setTypingSpeed(0.00);
        typingCharsCount.current = 0; // Reset the count of characters typed
    };

    const analyzeText = () => {
        const words = text.trim().split(/\s+/);
        setWordCount(words.length);
        setCharacterCount(text.length);

        // Perform sentiment analysis
        const analysis = new Sentiment();
        const result = analysis.analyze(text);

        // Update sentiment score
        const score = result.score;
        setSentimentScore(score);

        // Determine sentiment result based on score
        if (score > 0) {
            setSentimentResult('Positive');
        } else if (score < 0) {
            setSentimentResult('Negative');
        } else {
            setSentimentResult('Neutral');
        }

        // Calculate word frequency
        const frequency: { [key: string]: number } = {};
        words.forEach((word) => {
            const lowerCaseWord = word.toLowerCase();
            frequency[lowerCaseWord] = (frequency[lowerCaseWord] || 0) + 1;
        });
        setWordFrequency(frequency);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setShowPasteMessage(true);
        setTimeout(() => setShowPasteMessage(false), 3000);
    };

    useEffect(() => {
        const handleKeyUp = () => {
            if (typingStartTime.current) {
                typingEndTime.current = Date.now();
                const elapsedTime = (typingEndTime.current - typingStartTime.current) / 1000; // Convert to seconds
                const typingSpeed = (typingCharsCount.current / elapsedTime) * 60; // Characters per minute
                setTypingSpeed(typingSpeed);
            }
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
          document.removeEventListener('keyup', handleKeyUp);
        };
      }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (!typingStartTime.current) {
            typingStartTime.current = Date.now();
        }
        // Update the count of characters typed
        typingCharsCount.current = e.target.value.length;
    };

    // Set button background color based on color mode
    const buttonBgColor = useColorModeValue('brand.500', 'brand.300');
    const buttonHoverBgColor = useColorModeValue('brand.600', 'brand.400');


    return (
        <div>
            <Textarea
                value={text}
                onPaste={handlePaste}
                onChange={handleTextChange}
                placeholder="Enter some text here..."
                mb={4}
                borderRadius="md"
                p={3}
                borderColor="gray.300"
                _hover={{ borderColor: 'gray.400' }}
                minHeight="150px"
                height={['150px', '200px', '250px']}
                resize="vertical"
            />
            {showPasteMessage && <Text color="red">Copying and pasting is not allowed! Please type your text.</Text>}
            <Spacer />
            <Button onClick={analyzeText} colorScheme="blue" bg={buttonBgColor} _hover={{ bg: buttonHoverBgColor }} mb={4}>
                Analyze Text
            </Button>
            <Button onClick={handleClear} colorScheme="red" bg="red.400" _hover={{ bg: 'red.500' }} mb={4}>
                Clear
            </Button>
            <div>
                <Heading as="h2" size="md" mb={2}>Analysis Results:</Heading>
                <Text>Word count: {wordCount}</Text>
                <Text>Character count: {characterCount}</Text>
                <Text>Sentiment score: {sentimentScore}</Text>
                <Text>Sentiment result: {sentimentResult}</Text>
                <Text>Typing speed (characters per minute): {typingSpeed.toFixed(2)}</Text>
                <WordFrequencyChart wordFrequency={wordFrequency} />
           </div>
        </div>
    );
};

export default TextAnalyzer;