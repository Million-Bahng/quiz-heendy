exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        // 간단한 선착순 로직 (시간 기반)
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 오전 9-11시를 선착순 시간으로 설정
        const isWinner = (hour >= 9 && hour <= 11);
        const participantNumber = Math.floor(Math.random() * 100) + 1;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                isWinner: isWinner,
                participantNumber: participantNumber,
                message: '제출이 완료되었습니다!'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                error: error.message 
            })
        };
    }
};
