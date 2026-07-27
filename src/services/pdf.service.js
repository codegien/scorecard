const PDFDocument = require('pdfkit');
const QRCode      = require('qrcode');
const path        = require('path');
const fs          = require('fs');


class PDFService {
    //--- <Main Entry> ------\
    async generateExaminationSlip(candidate, res){
        const doc =  new PDFDocument({ size: 'A4', margin: 50, bufferPages: true});
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="exam-slip-${candidate.registrationNumber}.pdf`
        );
        doc.pipe(res);
        await this._buildExamSlip(doc, candidate);
        doc.end();
    };
    //_drawHeader --REMEBER
    async _buildExamSlip(doc, candidate) {
        const W = 595 - 100;
       
        this._drawHeader(doc, 'SCORE CARD EXAMINATION BOARD', 'EXAMINATION ATTENDANCE SLIP' );

        //QR code
        const qrBuffer = await QRCode.toBuffer(candidate.registrationNumber, { width: 80, margin: 1});
        doc.image(qrBuffer, 495, 55, { width: 70});

        let y = 155

        //Passport
        if (candidate.passport?.url && fs.existsSync(candidate.passport.url)){
            doc.image(candidate.passport.url, 50, y, { width: 90, height: 108});
        } else {
            doc.rect(50, y, 90, 108).stroke('#ccc');
            doc.fontSize(7).fillColor('#aaa').text('PASSPORT', 50, y + 48, { width: 90, align: 'center'});
        }

        const dx = 155;
        const dw = W - 105;
        const rows = [
            ['Registration Number',     candidate.registrationNumber],
            ['Candidate Name',          candidate.fullName?.toUpperCase()],
            ['Date of Birth',           new Date(candidate.dateOfBirth).toLocaleDateString('en-GB')],
            ['Gender',                 candidate.gender],
            ['State of Origin',        candidate.stateOfOrigin],
            ['Exam Center',            `${candidate.examCenterCode} - ${candidate.examCenterName}`],
            ['Exam Date',              candidate.scheduleDate? new Date(candidate.scheduleDate).toLocaleDateString('en-GB'): 'TBC'],
            ['Exam Time',              candidate.scheduleTime || 'TBC'],
            ['Seat Number',            candidate.seatNumber  || 'TBC'],
        ];
      rows.forEach(([lbl, val]) => {
        doc.fontSize(8).fillColor('#555').text(`${lbl}:`, dx, y, {width: 120});
        doc.fontSize(9).fillColor('#111').font('Helvetica-Bold').text(String(val || 'N/A'), dx + 125, y, {width: dw - 125});
        doc.font('Helvetica');
        y += 18;
      });
      
      y = 295
      this._sectionTitle(doc, 'SUBJECTS', y);
      y += 22;

      candidate.subjects?.forEach((subj, i)=>{
        doc.rect(50, y, W, 22).fill(i % 2 === 0? '#f7f9fc' : '#fff');
        doc.fontSize(9).fillColor('#222').text(`${i + 1}. ${subj}`, 60, y + 6);
        y += 22;
      });

      //Instruction
      y += 15;
      this._sectionTitle(doc, "IMPORTANT INSTRUCTION", y);
      y += 22;

      const instructions  = [
        'Arrive at the examination Center atg least 30 minutes before your scheduled time.',
        'Bring this and a valid means of identification (NIN)',
         'No electronic devices including mobile phones allowed in the examination hall.',
         'Candidates must not leave the hall until 30 minute. after the examination has commenced',
         'Any candidate caught with prohibited items will be disqualified and prosecuted.',
      ];

      instructions.forEach((instr, i) => {
        doc.fontSize(8).fillColor('#333').text(`${i + 1}. ${instr}`, 50, y, { width: W});
        y += 18;
      });

      this._drawFooter(doc, candidate.registrationNumber);
    }
    _drawHeader(doc, org, title){
        doc.rect(50, 45, 495, 8).fill('#008751');
        doc.rect(218, 45, 159, 8).fill('#ffffff');

        doc.fontSize(14).fillColor('#1a365d').font('Helvetica-Bold').text(org, 50, 60, {align: 'center', width: 495});

        doc.fontSize(14).fillColor('#c53030').font('Helvetica-Bold').text(org, 50, 60, {align: 'center', width: 495});

        doc.moveTo(50, 100).lineTo(545, 100).strokeColor('#1a365d').lineWidth(1.5).stroke();
        doc.fontSize(7.5).fillColor('#666').font('Helvetica-Bold').text(
            `Generated: ${new Date().toLocaleString('en-GB')} | ${process.env.APP_NAME }  |  ${process.env.APP_URL}`,
            50, 104, {align: 'center', width: 495});
    
      doc.moveTo(50, 118).lineTo(545, 118).strokeColor('#e2e8f0').lineWidth(0.5).stroke()

    }
    _sectionTitle(doc, text, y){
        doc.rect(50, y, 495, 19).fill('#1a365d');
        doc.fontSize(9).fillColor('white').font('Helvetica-Bold').text(text, 57, y + 5);
        doc.font('Helvetica');
    }
    _drawFooter (doc, regNumber){
        const pageCount = doc.bufferedPageRange().count;
        for (let i =0; i < pageCount; i++) {
            doc.switchToPage(i);
            const y = doc.page.height - 55;
            doc.moveTo(50, y).lineTo(545, y).strokeColor('#1a365d').lineWidth(0.8).stroke();
            doc.fontSize(7).fillColor('#666')
            .text(
                `${process.env.APP_NAME} | Registration: ${regNumber} | ` + 
                `This document is official and valid fo presentation to institution.`, 50, y + 6, {align: 'center', width: 495}
            );
            doc.text(`Page ${i + 1} of ${pageCount}`, 50,  y + 18, {align: 'right', width: 495})
           
        }
    }
}

module.exports = new PDFService();